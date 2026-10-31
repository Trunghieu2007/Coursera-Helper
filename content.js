const WAIT_LIMIT = 8000;
const WAIT_STEP = 250;
const CODE_FENCE = "```";
const BLOCK_TAGS = ["p", "div", "li", "ul", "ol", "figure", "table", "tr", "td", "th", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "section"];

// the areas a rendered piece of code lives in. An editor root is matched on purpose: walking
// into it would also walk its line-number margin and its helper widgets, which are furniture
// around the code rather than the code
const CODE_AREAS = "pre, .monaco-editor, .cm-editor, .CodeMirror, .view-lines, .cm-content, .CodeMirror-code";
const CODE_LINES = ".view-line, .cm-line, .CodeMirror-line";

// the nodes an answer is written in, whether that is a code editor or a plain field. The
// editor keeps a one-line textarea for its cursor, which is never the answer itself
const CODE_ANSWER_ROOTS = ".rc-CodeBlock, .monaco-editor, .cm-editor, .CodeMirror, pre";
const ANSWER_FIELDS = 'textarea:not(.inputarea), input[type="text"], input[type="number"], [data-slate-editor="true"], [contenteditable="true"]';

// the nodes an answer is written around, and the furniture that only looks like one: a toolbar
// or a page header holds inputs of its own, and the box in it is a filter, not the student's work
const ANSWER_CHROME = '[role="toolbar"], header, nav, [data-testid*="toolbar"]';

// panels Coursera keeps on the page for an automated reader: they are addressed to an assistant
// rather than to the student, and a button next to them asks that assistant to click it. Neither
// is ever copied and neither is ever touched, whatever the text inside them says. The selector
// covers both the attributes and the test ids the four markers are written with
const AI_FACING_SELECTOR = '[data-ai-instructions], [data-testid="content-integrity-instructions"],'
    + ' [data-testid="acknowledgment-checkpoint"], [data-assessment-checkpoint]';

// the hosts a profile photo may come from: Coursera itself and the two image networks its
// pages serve photos from. A page can point this value anywhere, so a photo from another host
// is dropped and the panel falls back to the initials
const ACCOUNT_PHOTO_HOSTS = ["coursera.org", "cloudfront.net", "ctfassets.net"];

// some Coursera questions render their choices inside a frame of Coursera's own widget host, so
// the parent page holds the question text and nothing else. The file is loaded into that frame
// too and each side decides what it is by where it sits: only the Coursera page asks, only the
// widget frame answers, and a widget page opened as a tab of its own is neither and loads nothing
const WIDGET_HOST = "d10o6em2qtnr4q.cloudfront.net";
const COURSERA_ORIGIN = /^https:\/\/([a-z0-9-]+\.)+coursera\.org$/i;
const BRIDGE_KEY = "ccq-widget-v1";
const ASK_RETRY = 300;
const ASK_LIMIT = 4000;
const MAX_OPTIONS = 40;
const MAX_OPTION_LENGTH = 8000;

// the class token Coursera puts on the row of one choice, hashed suffix and all, and the node
// inside that row that carries the text. Both names come out of the frame's own rendered markup
const OPTION_TOKEN = "option_host";
const OPTION_TEXT_NODE = '[class~="text"]';
const OPTION_SLOT_NODE = '[class*="option_optionText"]';
const WIDGET_KINDS = ["single_answer", "multiple_answer"];

// MathJax 2.7.7, the build the widget frame loads, leaves a rendered copy of every formula next
// to its source and the copy holds a second plain-text version of it. KaTeX and MathJax 3 are
// already read by mathSource, so only the output wrappers of the older build are listed here
const TYPESET_MATH = ["MathJax", "MathJax_Display", "MathJax_CHTML", "MathJax_SVG", "mjx-chtml", "MJXc-display"];
const TYPESET_MATH_PREFIXES = ["MJXc-", "MJX_Assistive", "mjx-"];

// the question components Coursera names on the block itself, taken from the names in its own
// page bundles. Read first, because an editor can be open under a question for a different
// reason: a numeric question with a code sample in its prompt is still a numeric question
const DECLARED_TYPES = {
    CodeExpressionQuestion: "code_expression",
    NumericQuestion: "numeric_input",
    MathQuestion: "numeric_input",
    MultipleChoiceQuestion: "single_answer",
    MultipleChoiceReflectQuestion: "single_answer",
    CheckboxQuestion: "multiple_answer",
    CheckboxReflectQuestion: "multiple_answer",
    PlainTextQuestion: "text_input",
    TextExactMatchQuestion: "text_input",
    RegexQuestion: "text_input",
    UrlQuestion: "text_input",
    MultipleFillableBlanksQuestion: "text_input",
    RichTextQuestion: "essay",
    TextReflectQuestion: "essay",
    FileUploadQuestion: "file_upload",
    WidgetQuestion: "widget",
    OffPlatformQuestion: "off_platform"
};

let lastAutoCopyUrl = "";
let settings = { autoCopy: false };

// read the saved setting once per page and keep it in memory
function loadSettings() {
    return chrome.storage.local.get(["autoCopy"]).then((stored) => {
        settings = { autoCopy: stored.autoCopy === true };
    });
}

// list the question blocks currently visible on the page. The blocks Coursera names are the
// first choice; the layout classes are only read when no named block is on the page at all,
// because a class name is a build artefact and anything wearing it is not necessarily a question
function questionBlocks() {
    const blocks = [];
    const remember = (block) => {
        if (blocks.some((seen) => seen === block || seen.contains(block) || block.contains(seen))) return;
        blocks.push(block);
    };

    Array.from(document.querySelectorAll('[data-testid^="part-Submission_"]'))
        .filter((block) => block.querySelector('[id^="prompt-"] [data-testid="cml-viewer"]'))
        .forEach(remember);
    if (blocks.length > 0) return blocks;

    Array.from(document.querySelectorAll(".css-1erl2aq, .css-12u8wr5"))
        .filter((block) => block.querySelector('[data-testid="cml-viewer"]'))
        .forEach(remember);
    return blocks;
}

// the component name Coursera put on the block, without its prefix and without the graded
// variant marker, or an empty string when the block is only found by its layout classes
function declaredName(block) {
    const testId = block.getAttribute("data-testid") || "";
    if (testId.indexOf("part-Submission_") !== 0) return "";
    return testId.slice("part-Submission_".length).replace(/^Graded/, "");
}

// question type, keeping the English names used by the original source
function questionType(block, options) {
    const declared = DECLARED_TYPES[declaredName(block)] || "";

    if (options.length > 0) {
        const firstInput = block.querySelector('input[type="radio"], input[type="checkbox"]');
        if (firstInput && firstInput.type === "checkbox") return "multiple_answer";
        return "single_answer";
    }
    if (declared) return declared;
    if (block.querySelector(".monaco-editor, [data-mode-id]")) return "code_expression";
    if (block.querySelector('[data-slate-editor="true"], [contenteditable="true"], textarea:not(.inputarea)')) {
        return "essay";
    }
    if (block.querySelector('input[type="text"], input[type="number"]')) {
        return "text_input";
    }
    return "unknown";
}

// read a node's text, empty string when the node is missing
function nodeText(node) {
    if (!node) return "";
    return tidyLines(collectText(node));
}

// page material no copy may carry: the panels written for an automated reader, and anything the
// page keeps out of sight. A hidden panel holds answer-shaped rows too, so every reader of the
// page asks this before taking a node's text. A formula source lives in a script the browser
// never paints, so the paint check is skipped for a node the caller knows is such a script
function copyHiddenNode(node, painted) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    if (node.closest(AI_FACING_SELECTOR)) return true;
    if (node.closest("[hidden]")) return true;
    // an aria-hidden box that declares itself math hides a visual duplicate from a screen
    // reader, not the content: Coursera wraps every rendered formula that way, so that one box
    // is walked and the formula inside it is still read
    const quiet = node.closest('[aria-hidden="true"]');
    if (quiet && quiet !== node.closest('[role="math"]')) return true;
    if (painted !== false && typeof node.checkVisibility === "function" && !node.checkVisibility()) return true;
    return false;
}

// walk the DOM by hand: innerText of KaTeX repeats every formula three times
function collectText(node) {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent;
    if (node.nodeType !== Node.ELEMENT_NODE) return "";

    const testId = node.getAttribute("data-testid") || "";
    const tag = node.tagName.toLowerCase();
    if (copyHiddenNode(node, tag !== "script")) return "";
    if (tag === "br") return "\n";
    if (tag === "style" || tag === "noscript") return "";
    if (tag === "script") return mathScript(node);
    if (testId === "visually-hidden") return "";
    if (tag === "img") return imageText(node);

    const formula = mathSource(node);
    if (formula) return "$" + formula + "$";
    if (isTypesetMath(node)) return "";

    if (node.matches && node.matches(CODE_AREAS)) {
        const code = codeAreaText(node);
        return code ? "\n" + code + "\n" : "";
    }

    if (tag === "tr") return rowText(node);
    if (tag === "a") return linkText(node);

    let text = childrenText(node);
    return BLOCK_TAGS.includes(tag) ? "\n" + text + "\n" : text;
}

// the text of the children of a node, in order
function childrenText(node) {
    let text = "";
    for (const child of node.childNodes) text += collectText(child);
    return text;
}

// one row of a table, on one line: a reader of the copy has to be able to tell which cell
// belongs to which row, and a stack of loose cells does not say that
function rowText(row) {
    const cells = Array.from(row.children)
        .filter((cell) => ["td", "th"].includes(cell.tagName.toLowerCase()))
        .map((cell) => tidyLines(collectText(cell)).replace(/\n+/g, " ").replace(/\|/g, "/"))
        .filter((cell) => cell.length > 0);
    if (cells.length === 0) return "";
    return "\n" + cells.join(" | ") + "\n";
}

// a markdown label on one line: a bracket would end it early and a backslash would start an
// escape, so both are escaped, and a line break would split the paragraph that carries it
function markdownLabel(value) {
    return String(value || "")
        .replace(/[\r\n]+/g, " ")
        .trim()
        .replace(/[\\\[\]]/g, "\\$&");
}

// the address a markdown destination may hold: a real web address only, with the characters
// that would end the destination early percent-encoded, so a URL cannot break out of its link.
// Anything else is not written as a link at all and the caller falls back to plain text
function markdownUrl(value) {
    try {
        const url = new URL(value, window.location.href);
        if (url.protocol !== "http:" && url.protocol !== "https:") return "";
        return url.href.replace(/[()<>]/g, (ch) => "%" + ch.charCodeAt(0).toString(16).toUpperCase());
    } catch {
        return "";
    }
}

// a link is copied with its target, since the words of a link are rarely the address
function linkText(node) {
    const label = tidyLines(childrenText(node));
    const href = node.getAttribute("href") || "";
    if (!/^https?:\/\/\S{1,2000}$/i.test(href)) return label;
    const address = markdownUrl(href);
    const text = markdownLabel(label) || markdownLabel(address);
    return address ? "[" + text + "](" + address + ")" : text;
}

// a code area is copied as a fenced block, one line per rendered line, with its indentation
// kept: prose is re-flowed and that is fine, but re-flowing code breaks it
function codeAreaText(node) {
    const area = codeArea(node);
    if (area.lines.length === 0) return "";
    const fence = codeFence(area.lines);
    return [fence + area.language].concat(area.lines, [fence]).join("\n");
}

// the fence a block of code is written with: one backtick longer than the longest run the code
// itself opens a line with, indentation or not, and never shorter than three, so a line of the
// code that looks like a fence cannot close the block it sits in
function codeFence(lines) {
    let longest = 0;
    lines.forEach((line) => {
        const run = /^[ \t]*`+/.exec(line);
        if (run && run[0].length > longest + (/^[ \t]*/.exec(line)[0].length)) {
            longest = run[0].length - /^[ \t]*/.exec(line)[0].length;
        }
    });
    return "`".repeat(Math.max(CODE_FENCE.length, longest + 1));
}

// the language and the rendered lines of one code area
function codeArea(node) {
    return { language: languageOf(node), lines: codeLines(node) };
}

// the rendered lines of one code area. An editor is free to copy a few of its lines into a
// helper widget, so only the line containers count, and the fullest of them wins
function codeLines(node) {
    if (node.tagName.toLowerCase() === "pre") return splitLines(sourceText(node));

    const isContainer = ".view-lines, .cm-content, .CodeMirror-code";
    let candidates = Array.from(node.querySelectorAll(isContainer));
    if (candidates.length === 0 && node.matches(isContainer)) candidates = [node];

    let best = [];
    for (const container of candidates) {
        const lines = Array.from(container.querySelectorAll(CODE_LINES));
        if (lines.length > best.length) best = lines;
    }
    if (best.length === 0) return [];

    // an editor stacks its lines by offset, so the offset orders them and the document
    // order only breaks a tie
    const ordered = best
        .map((line, order) => ({ order, top: offsetTop(line), text: sourceText(line) }))
        .sort((a, b) => (a.top === b.top ? a.order - b.order : a.top - b.top));
    // an editor pads an empty line with a space, and the width of a blank line means nothing
    return ordered.map((line) => (line.text.trim() === "" ? "" : line.text));
}

// one code node read as source: tabs become spaces, the left margin is kept, the trailing
// spaces of a line are not worth carrying
function sourceText(node) {
    return node.textContent.replace(/\r/g, "").replace(/\t/g, "    ").replace(/\u00a0/g, " ");
}

// split a code block into lines, dropping only the empty ones that pad the end
function splitLines(text) {
    const lines = text.replace(/[ \u00a0]+$/gm, "").split("\n");
    while (lines.length > 0 && lines[lines.length - 1].trim() === "") lines.pop();
    while (lines.length > 0 && lines[0].trim() === "") lines.shift();
    return lines;
}

// the vertical position of a rendered line, which is how an editor orders its window of lines
function offsetTop(node) {
    const style = node.getAttribute("style") || "";
    const top = /(?:^|[;\s])top:\s*(-?[\d.]+)px/.exec(style);
    if (top) return Number(top[1]);
    const transform = /translate\(?:\s*\d+(?:\.\d+)?px\s*,\s*(-?\d+(?:\.\d+)?)px/.exec(style);
    if (transform) return Number(transform[1]);
    return Number.isFinite(node.offsetTop) ? node.offsetTop : 0;
}

// the language an editor says it is showing, so the fenced block can name it
function languageOf(node) {
    const modes = [node] .concat(ancestorList(node));
    for (const element of modes) {
        const mode = element.getAttribute && element.getAttribute("data-mode-id");
        if (mode && /^[\w+.-]{1,32}$/.test(mode)) return mode;
    }
    const codeClass = Array.from(node.querySelectorAll("code[class]"))
        .map((code) => /language-([\w+.-]{1,32})/.exec(code.className))
        .find((match) => match);
    return codeClass ? codeClass[1] : "";
}

// the chain of elements above a node, bounded, for the language lookup
function ancestorList(node) {
    const chain = [];
    let parent = node.parentElement;
    while (parent && chain.length < 12) {
        chain.push(parent);
        parent = parent.parentElement;
    }
    return chain;
}

// LaTeX source of a formula, empty when the node is not rendered math
function mathSource(node) {
    const tag = node.tagName.toLowerCase();
    if (!node.classList.contains("katex") && tag !== "mjx-container") return "";
    const annotation = node.querySelector('annotation[encoding="application/x-tex"]');
    const source = annotation ? annotation.textContent : node.getAttribute("data-latex") || "";
    return source.trim();
}

// the source of a formula the older MathJax keeps beside its rendering, in a script tag of its
// own: reading it where it sits puts the words and the formula in the order the reader sees
function mathScript(node) {
    const type = node.getAttribute("type") || "";
    if (type.indexOf("math/") !== 0) return "";
    const source = (node.textContent || "").trim();
    return source ? "$" + source + "$" : "";
}

// the rendered copy of a formula, which repeats what the source already says twice over: once
// as a box per glyph and once again as the text an assistant would read
function isTypesetMath(node) {
    for (const token of classTokens(node)) {
        if (TYPESET_MATH.includes(token)) return true;
        if (TYPESET_MATH_PREFIXES.some((prefix) => token.indexOf(prefix) === 0)) return true;
    }
    return false;
}

// markdown picture with the real URL, so a diagram survives the paste. The source is resolved
// against the page because a saved page keeps relative addresses, and only a web address is
// written as a picture: a data: source is described instead and any other scheme is not a
// picture at all, so only the alt text is kept
function imageText(node) {
    const alt = (node.getAttribute("alt") || "").trim();
    const src = node.currentSrc || node.src || "";
    const label = markdownLabel(alt);
    if (!src) return label ? "[image: " + label + "]" : "";
    if (/^data:/i.test(src)) return "[embedded image" + (label ? ": " + label : "") + "]";
    const address = markdownUrl(src);
    if (!address) return label ? "[image: " + label + "]" : "";
    return "![" + label + "](" + address + ")";
}

// drop the blank lines the block walk leaves behind, keeping at most one, but leave a fenced
// block alone: its blank lines and its left margin are part of the code. The opening fence
// length is remembered, so only the line that is exactly that fence closes the block and a
// longer fence of the code itself stays inside it
function tidyLines(text) {
    const kept = [];
    let fence = "";
    for (const raw of text.replace(/\r/g, "").split("\n")) {
        const line = raw.replace(/[ \t\u00a0]+/g, " ").trim();
        if (fence) {
            if (line === fence) {
                kept.push(line);
                fence = "";
            } else {
                kept.push(raw.replace(/[ \u00a0]+$/, ""));
            }
            continue;
        }
        const opening = /^(`{3,})/.exec(line);
        if (opening) {
            fence = opening[1];
            kept.push(line);
            continue;
        }
        if (line.length > 0 || kept[kept.length - 1] !== "") kept.push(line);
    }
    if (fence) kept.push(fence);
    return kept.join("\n").trim();
}

// the code a question hands you to write in: an editor of the block that sits outside the
// question text, since a code area inside the question text was copied with it already
function answerCode(block, promptNode) {
    const roots = Array.from(block.querySelectorAll(CODE_ANSWER_ROOTS))
        .filter((node) => !promptNode || !promptNode.contains(node))
        .filter((node) => !copyHiddenNode(node));
    // an editor is built of nested nodes of its own, so only the outer ones are read
    const outer = roots.filter((node) => !roots.some((other) => other !== node && other.contains(node)));

    for (const root of outer) {
        const area = codeArea(root);
        if (area.lines.length === 0) continue;
        return {
            language: area.language,
            text: area.lines.join("\n"),
            truncated: showsOnlyAWindow(root, area.lines.length)
        };
    }
    return null;
}

// an editor paints a window of its text and numbers the gutter from the model, so a line
// number above the number of painted lines means the rest is scrolled out of the page
function showsOnlyAWindow(root, rendered) {
    let highest = 0;
    root.querySelectorAll(".line-numbers").forEach((cell) => {
        const number = Number((cell.textContent || "").trim());
        if (Number.isFinite(number) && number > highest) highest = number;
    });
    return highest > rendered;
}

// what the student has typed into the answer of this question so far, which is part of the
// material too: a draft is worth more to a reader than a blank prompt
function answerText(block, promptNode) {
    const fields = Array.from(block.querySelectorAll(ANSWER_FIELDS))
        .filter((field) => !promptNode || !promptNode.contains(field))
        .filter((field) => !copyHiddenNode(field))
        .filter((field) => !field.closest(ANSWER_CHROME));
    const values = fields
        .map((field) => {
            if (answerPlaceholderOnly(field)) return "";
            if (field.tagName.toLowerCase() === "textarea" || field.tagName.toLowerCase() === "input") {
                return String(field.value === undefined ? field.getAttribute("value") || "" : field.value);
            }
            return sourceText(field);
        })
        .map((value) => value.replace(/\r/g, ""))
        .filter((value) => value.trim().length > 0);
    if (values.length === 0) return "";
    return values.map((value) => value.replace(/[ \u00a0]+$/g, "")).join("\n").trim();
}

// a slate editor paints its placeholder inside the editor itself, so a blank field reads as if
// the placeholder were the student's words. The placeholder node is the tell, and a field that
// already holds a draft no longer reads as the placeholder alone
function answerPlaceholderOnly(field) {
    if (!field.matches('[contenteditable="true"], [data-slate-editor="true"]')) return false;
    const placeholder = field.querySelector("[data-slate-placeholder]");
    if (!placeholder) return false;
    return sourceText(field).trim() === sourceText(placeholder).trim();
}

// what this copy of the file is allowed to do, decided by where it is running. A Coursera page
// asks, a widget frame answers, and anything else (the widget opened as a tab of its own, a
// frame of another course tool) loads no logic at all
function extensionRole() {
    const isTop = window.top === window.self;
    if (isTop && COURSERA_ORIGIN.test(window.location.origin)) return "controller";
    if (!isTop && window.location.hostname === WIDGET_HOST) return "responder";
    return "none";
}

// the class tokens of an element, read from the attribute because an SVG node keeps its classes
// in an object and stringifying that gives no tokens at all
function classTokens(node) {
    return (node.getAttribute("class") || "").split(/\s+/).filter((token) => token.length > 0);
}

// a row is worth copying when the reader can see it. A frame that has not painted its question
// yet has nothing, and a hidden row is not one of the choices on offer
function rowVisible(node) {
    if (typeof node.checkVisibility === "function") return node.checkVisibility();
    return true;
}

// the rows of choices of a subtree. The match is on a whole class token because a name that
// merely starts with it belongs to a different component, and the innermost row wins when
// Coursera nests one marked node inside another
function choiceRows(scope) {
    const marked = Array.from(scope.querySelectorAll("[class]")).filter((node) =>
        classTokens(node).some((token) => token === OPTION_TOKEN || token.startsWith(OPTION_TOKEN + "_"))
    );
    const inner = marked.filter((node) => !marked.some((other) => other !== node && other.contains(node)));
    return inner.filter((row) => rowVisible(row) && !copyHiddenNode(row));
}

// one row read as text. The words sit in a shared text component and the row's own slot is
// usually empty, so the slot is only a fallback and the row itself a last resort
function choiceRowText(row) {
    const named = row.querySelector(OPTION_TEXT_NODE);
    const text = named ? nodeText(named) : "";
    if (text) return text;
    for (const slot of row.querySelectorAll(OPTION_SLOT_NODE)) {
        const filled = nodeText(slot);
        if (filled) return filled;
    }
    return nodeText(row);
}

// the kind of choice a group is: the real input decides, and a group with no input rendered
// only says what its role claims. A list alone is never taken to mean several answers
function choiceKind(rows, group) {
    const inputs = [];
    rows.forEach((row) => row.querySelectorAll("input").forEach((input) => inputs.push(input)));
    if (inputs.length === 0 && group) group.querySelectorAll("input").forEach((input) => inputs.push(input));
    if (inputs.some((input) => input.type === "checkbox")) return "multiple_answer";
    if (inputs.some((input) => input.type === "radio")) return "single_answer";
    if (group && group.getAttribute("role") === "radiogroup") return "single_answer";
    return "";
}

// read the choices of the question one frame is showing, from inside its group only: the frame
// also holds a banner when the time ran out, and anything a browser tool injected around it
function readWidgetFrame(doc) {
    const groups = Array.from(doc.querySelectorAll("fieldset"))
        .map((group) => ({ group, rows: choiceRows(group) }))
        .filter((found) => found.rows.length > 0);
    const best = groups.length > 0 ? groups[0] : { group: null, rows: choiceRows(doc) };

    const selected = [];
    const options = [];
    best.rows.slice(0, MAX_OPTIONS).forEach((row) => {
        const text = choiceRowText(row).slice(0, MAX_OPTION_LENGTH);
        if (!text) return;
        options.push(text);
        const input = row.querySelector("input");
        if (input && input.checked) selected.push(text);
    });

    return { kind: choiceKind(best.rows, best.group), options, selected };
}

// the origin a frame's address names, or an empty string when it names none
function frameOrigin(frame) {
    try {
        return new URL(frame.getAttribute("src") || "", window.location.href).origin;
    } catch {
        return "";
    }
}

// the frame that holds the choices of a block, when the block has one and it belongs to the
// widget host: an app the course embeds is a different thing and is never asked
function widgetFrameOf(block) {
    for (const frame of Array.from(block.querySelectorAll("iframe"))) {
        if (!(frame.getAttribute("src") || "")) continue;
        let url;
        try {
            url = new URL(frame.getAttribute("src"), window.location.href);
        } catch {
            continue;
        }
        if (url.hostname === WIDGET_HOST) return frame;
    }
    return null;
}

// the frame side: answer one question of the Coursera page this frame sits in. A page script
// can post the same shape into its own frame, so the request is only honoured when it came
// from the parent this frame is actually in and from an origin Coursera owns
function startWidgetResponder() {
    window.addEventListener("message", (event) => {
        if (!COURSERA_ORIGIN.test(event.origin || "")) return;
        if (event.source !== window.parent) return;

        const request = event.data;
        if (!request || request.key !== BRIDGE_KEY || request.action !== "ask") return;
        if (typeof request.requestId !== "string" || request.requestId.length === 0 || request.requestId.length > 160) return;

        const answer = readWidgetFrame(document);
        // nothing painted yet: stay quiet and let the page ask again rather than answer "empty"
        if (answer.options.length === 0) return;
        event.source.postMessage({ key: BRIDGE_KEY, requestId: request.requestId, answer }, event.origin);
    }, true);
}

// a reply is only believed when it came from the frame that was asked, from the origin that
// frame has, and carries the exact id that frame was asked with: a sibling frame, a page
// script or an answer left over from the previous copy all fail one of those three
function widgetAccept(event, target) {
    if (!target || !target.frame) return false;
    if (event.source !== target.frame.contentWindow) return false;
    const expected = frameOrigin(target.frame);
    if (!expected || event.origin !== expected) return false;

    const data = event.data;
    if (!data || data.key !== BRIDGE_KEY) return false;
    if (typeof data.requestId !== "string" || data.requestId !== target.requestId) return false;
    return widgetSanitize(data.answer);
}

// the answer is text from a page, so it is checked the way page text is checked: closed kind,
// bounded counts, strings only
function widgetSanitize(answer) {
    if (!answer || !Array.isArray(answer.options)) return null;
    const options = answer.options
        .filter((text) => typeof text === "string" && text.trim().length > 0)
        .map((text) => text.slice(0, MAX_OPTION_LENGTH))
        .slice(0, MAX_OPTIONS);
    if (options.length === 0) return null;
    const kind = WIDGET_KINDS.indexOf(answer.kind) >= 0 ? answer.kind : "";
    const selected = Array.isArray(answer.selected)
        ? answer.selected.filter((text) => options.indexOf(text) >= 0)
        : [];
    return { kind, options, selected };
}

// ask every frame of this run and keep asking until each has answered or the wait ran out,
// because a frame boots later than the page that wants to read it. A widget question that gets
// nothing says so in a note either way: a frame that stayed silent and no frame to ask at all
// both leave the reader with an empty list, and an empty list with no reason reads as a question
// that simply has no choices
async function fillWidgetChoices(entries) {
    const wanted = entries
        .map((entry, index) => ({ index, entry, frame: widgetFrameOf(entry.block), answer: null }))
        .filter((target) => target.entry.question.type === "widget" && target.entry.question.options.length === 0);
    wanted.forEach((target) => { target.origin = target.frame ? frameOrigin(target.frame) : ""; });
    const askable = wanted.filter((target) => target.origin);
    if (askable.length > 0) {
        const token = BRIDGE_KEY + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
        const pending = new Map();
        askable.forEach((target) => {
            target.requestId = token + "-" + target.index;
            pending.set(target.requestId, target);
        });

        const listener = (event) => {
            const requestId = event.data && event.data.requestId;
            if (typeof requestId !== "string") return;
            const target = pending.get(requestId);
            if (!target) return;
            const answer = widgetAccept(event, target);
            if (!answer) return;
            pending.delete(requestId);
            target.answer = answer;
        };
        window.addEventListener("message", listener, true);

        const deadline = Date.now() + ASK_LIMIT;
        try {
            while (pending.size > 0 && Date.now() < deadline) {
                pending.forEach((target, requestId) => {
                    // the page can redraw a block while the loop waits, and a frame that left the
                    // page has no window to post into. That target is dropped, so the note below
                    // says its frame did not answer instead of failing the whole copy
                    const frame = target.frame;
                    const win = frame ? frame.contentWindow : null;
                    if (!frame || frame.isConnected === false || !win) {
                        pending.delete(requestId);
                        return;
                    }
                    try {
                        win.postMessage({ key: BRIDGE_KEY, action: "ask", requestId }, target.origin);
                    } catch {
                        pending.delete(requestId);
                    }
                });
                await new Promise((resolve) => setTimeout(resolve, ASK_RETRY));
            }
        } finally {
            window.removeEventListener("message", listener, true);
        }
    }

    wanted.forEach((target) => {
        const question = target.entry.question;
        if (!target.answer) {
            question.note = target.origin
                ? "The choices of this question are inside a frame that did not answer."
                : "The choices of this question are not on the page, and the block holds no frame of the course widget to ask.";
            return;
        }
        question.options = target.answer.options;
        if (target.answer.kind) question.type = target.answer.kind;
        if (target.answer.selected.length > 0) question.answer = target.answer.selected.join("\n");
    });
}

// turn one page block into a question + options object
function readQuestion(block, index) {
    const promptNode = block.querySelector('[id^="prompt-"] [data-testid="cml-viewer"]')
        || block.querySelector('[data-testid="cml-viewer"]');
    const question = nodeText(promptNode);
    if (!question) return null;

    const options = Array.from(block.querySelectorAll(".rc-Option"))
        .filter((option) => !copyHiddenNode(option))
        .map((option) => nodeText(option.querySelector('[data-testid="cml-viewer"]')))
        .filter((text) => text.length > 0);

    const record = {
        questionNumber: index + 1,
        type: questionType(block, options),
        question,
        options
    };

    const code = answerCode(block, promptNode);
    if (code) {
        if (code.language) record.language = code.language;
        record.code = code.text;
        if (code.truncated) record.codeWindow = true;
    }

    const answer = answerText(block, promptNode);
    if (answer) record.answer = answer;

    return record;
}

// wait until Coursera renders the question blocks (the SPA loads content late)
async function waitForQuestions() {
    const startedAt = Date.now();
    while (true) {
        const blocks = questionBlocks();
        if (blocks.length > 0) return blocks;
        if (Date.now() - startedAt > WAIT_LIMIT) return [];
        await new Promise((resolve) => setTimeout(resolve, WAIT_STEP));
    }
}

// extract every question visible on the current page. A block that turns out to hold no text is
// dropped, so the questions are numbered after that, and the block of each one is kept beside it
// because the choices of a widget question have to be asked for from the frame of that block
async function extractQuestions() {
    const blocks = await waitForQuestions();
    const entries = [];
    blocks.forEach((block) => {
        const question = readQuestion(block, entries.length);
        if (question) entries.push({ block, question });
    });

    await fillWidgetChoices(entries);
    entries.forEach((entry, index) => { entry.question.questionNumber = index + 1; });
    return entries.map((entry) => entry.question);
}

// the clipboard opens with these two lines, so a model answers by question number only and reads
// the markdown of a question the way it was written
const COPY_PROMPT = 'Reply only "questionNumber. answer", no explanation. Choice: option position (1-based) + exact text, commas for multiple; numeric/text/essay: content only; code: fenced block under the number, same language; math stays $...$.\n$...$ = math, ``` = code, ![alt](url) = figure you cannot open - use only the alt, answer "?" if the figure is required.';

// the clipboard text: the instructions first, a blank line, then the questions as JSON
function buildText(questions) {
    return COPY_PROMPT + "\n\n" + JSON.stringify(questions, null, 2);
}

// write text to the clipboard, with an execCommand fallback when the clipboard API is blocked
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.top = "-1000px";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        area.setSelectionRange(0, area.value.length);
        let ok = false;
        try {
            ok = document.execCommand("copy");
        } catch {
            ok = false;
        }
        area.remove();
        return ok;
    }
}

// manual copy when the user clicks the button in the side panel
async function copyNow() {
    const questions = await extractQuestions();
    if (questions.length === 0) return { count: 0, copied: false };

    const copied = await copyToClipboard(buildText(questions));
    return { count: questions.length, copied };
}

// auto copy, runs once per URL. The panel owns every notice now, so the result travels back
// to it; a page that shows no question block stays quiet
async function autoCopy() {
    if (!settings.autoCopy) return;
    if (lastAutoCopyUrl === window.location.href) return;

    const blocks = await waitForQuestions();
    if (blocks.length === 0) return;

    lastAutoCopyUrl = window.location.href;
    const result = await copyNow();
    chrome.runtime.sendMessage({ action: "copyStatus", count: result.count, copied: result.copied })
        .catch(() => {});
}

// the start-up state the page writes into an inline script, parsed as the JSON object it is.
// A script that only mentions window.App is skipped, so the loop can move on to the real one
function accountAppState(text) {
    const at = text.indexOf("window.App");
    if (at < 0) return null;
    const open = text.indexOf("{", text.indexOf("=", at));
    if (open < 0) return null;
    let depth = 0;
    let quoted = false;
    let escaped = false;
    for (let i = open; i < text.length; i += 1) {
        const ch = text[i];
        if (quoted) {
            if (escaped) escaped = false;
            else if (ch === "\\") escaped = true;
            else if (ch === '"') quoted = false;
            continue;
        }
        if (ch === '"') {
            quoted = true;
            continue;
        }
        if (ch === "{") depth += 1;
        else if (ch === "}") {
            depth -= 1;
            if (depth === 0) {
                try {
                    return JSON.parse(text.slice(open, i + 1));
                } catch {
                    return null;
                }
            }
        }
    }
    return null;
}

// one line of page text, with control characters and runs of space folded away
function accountLine(value, limit) {
    if (typeof value !== "string") return "";
    return value
        .replace(/[\u0000-\u001f\u007f]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, limit);
}

// the account email, kept only when it has the shape of one
function accountEmail(value) {
    const text = accountLine(value, 120);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) ? text : "";
}

// a host is allowed when it is one of the photo hosts or a subdomain of one. The bucket
// Coursera itself serves profile photos from is allowed in its plain and regional forms.
function accountPhotoHost(host) {
    const name = String(host || "").toLowerCase();
    if (name.indexOf("coursera-profile-photos.s3.") === 0 && name.endsWith(".amazonaws.com")) return true;
    return ACCOUNT_PHOTO_HOSTS.some((suffix) => name === suffix || name.endsWith("." + suffix));
}

// the profile photo, kept only as an https address on an allowed host the popup can show
function accountPhoto(value) {
    const text = typeof value === "string" ? value.trim() : "";
    if (!text || text.length > 500) return "";
    try {
        const url = new URL(text);
        if (url.protocol !== "https:" || !accountPhotoHost(url.hostname)) return "";
        return url.href;
    } catch {
        return "";
    }
}

// the signed-in account as the page itself describes it. The popup shows the name, the email
// and the photo back to the student, and the values are never stored or sent anywhere
function accountFromPage() {
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i += 1) {
        const text = scripts[i].textContent || "";
        if (text.indexOf("window.App") < 0) continue;
        const app = accountAppState(text);
        const store = app && app.context && app.context.dispatcher && app.context.dispatcher.stores
            && app.context.dispatcher.stores.ApplicationStore;
        const user = store && store.userData;
        if (!user || typeof user !== "object" || user.authenticated === false) continue;
        const account = {
            name: accountLine(user.fullName || user.full_name || user.display_name, 80),
            email: accountEmail(user.email_address),
            photo: accountPhoto(user.photo_120 || user.photo_60 || user.photo_24 || user.photo)
        };
        if (!account.name && !account.email && !account.photo) continue;
        return account;
    }
    return null;
}

// listen for messages from the popup. The channel only ever reaches this file from the
// extension, never from the page, and a message that is not a plain action is ignored.
// popup.sendMessage reaches every frame of the tab, so only the Coursera page may answer it
function startPageChannel() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (!request || typeof request.action !== "string") return false;
        if (request.action === "copyNow") {
            copyNow()
                .then((result) => sendResponse(result))
                .catch((error) => sendResponse({ error: error.message || "Copy failed." }));
            return true;
        }
        if (request.action === "ping") {
            sendResponse({ ok: true, url: window.location.href });
            return true;
        }
        if (request.action === "accountInfo") {
            sendResponse(accountFromPage());
            return true;
        }
        // the video and reading modules have their own listeners, so this one must not hold the channel
        return false;
    });
}

// update settings as soon as the panel changes them, no page reload needed
function startPageSettings() {
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== "local") return;
        if (changes.autoCopy) settings.autoCopy = changes.autoCopy.newValue === true;

        if (settings.autoCopy && changes.autoCopy && changes.autoCopy.newValue === true) {
            lastAutoCopyUrl = "";
            autoCopy();
        }
    });
}

// catch Coursera SPA navigation (pushState does not fire popstate) so auto copy runs again
function watchNavigation() {
    let currentUrl = window.location.href;
    setInterval(() => {
        if (window.location.href === currentUrl) return;
        currentUrl = window.location.href;
        autoCopy();
    }, 700);
    window.addEventListener("popstate", () => setTimeout(autoCopy, 400));
}

// the clipboard and the panel channel belong to the Coursera page alone: a frame of the widget
// host never copies, it only answers when the page it sits in asks it what it shows
const role = extensionRole();
if (role === "controller") {
    startPageChannel();
    startPageSettings();
    watchNavigation();
    loadSettings().then(autoCopy);
} else if (role === "responder") {
    startWidgetResponder();
}
