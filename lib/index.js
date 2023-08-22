/**
 * (C) Jocelyn Stericker <jocelyn@nettek.ca> 2015.
 * Part of the musicxml-interfaces <https://github.com/emilyskidsister/musicxml-interfaces>.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *****************************************************************
 *
 * MusicXML™ Version 3.0
 *
 * Copyright © 2004-2011 MakeMusic, Inc.
 * http://www.makemusic.com/
 *
 * This MusicXML™ work is being provided by the copyright
 * holder under the MusicXML Public License Version 3.0,
 * available from:
 *
 * http://www.musicxml.org/dtds/license.html
 * This file contains multiple DTDs.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopMiddleBottomBaseline = exports.LeftCenterRight = exports.NormalBold = exports.NormalItalic = exports.EnclosureShape = exports.LeftRight = exports.TopBottom = exports.UpDown = exports.OverUnder = exports.AboveBelow = exports.SymbolSize = exports.StartStopSingle = exports.StartStopContinue = exports.StartStop = exports.serializeGrouping = exports.serializeBarline = exports.serializeSound = exports.serializeAttributes = exports.serializeDirection = exports.serializeFiguredBass = exports.serializePrint = exports.serializeForward = exports.serializeHarmony = exports.serializeBackup = exports.serializePartSymbol = exports.serializeKey = exports.serializeTime = exports.serializeClef = exports.serializeNote = exports.serializeMeasure = exports.serializeScoreHeader = exports.serializeScore = exports.parseGrouping = exports.parseBarline = exports.parseSound = exports.parseAttributes = exports.parseDirection = exports.parseFiguredBass = exports.parsePrint = exports.parseForward = exports.parseHarmony = exports.parseBackup = exports.parsePartSymbol = exports.parseKey = exports.parseTime = exports.parseClef = exports.parseNote = exports.parseMeasure = exports.parseScoreHeader = exports.parseScore = void 0;
exports.ChordType = exports.ExplicitImpliedAlternate = exports.VoiceSymbol = exports.OctaveShiftType = exports.PedalType = exports.LineEndType = exports.WedgeType = exports.TipDirection = exports.DirectionTypeBg = exports.WingedType = exports.StartStopDiscontinue = exports.BarStyleType = exports.BarlineLocation = exports.SyllabicType = exports.BreathMarkType = exports.HoleClosedType = exports.HoleLocation = exports.ActualBothNone = exports.AccelRitNone = exports.BeamType = exports.NoteheadType = exports.StemType = exports.MxmlAccidental = exports.Count = exports.ShowFretsType = exports.PartSymbolType = exports.CancelLocation = exports.TimeSymbolType = exports.SeparatorType = exports.CueGraceLarge = exports.OddEvenBoth = exports.WholeHalfNone = exports.WholeHalfUnison = exports.UpperMainBelow = exports.UprightInverted = exports.NormalAngledSquare = exports.SolidDashedDottedWavy = exports.StraightCurved = exports.DirectionMode = void 0;
/*---- Parsing API ------------------------------------------------------------------------------*/
/**
 * Converts a MusicXML document into a MusicXML parttime-inspired JSON object.
 * See ScoreTimewise for full return type specification.
 *
 * This function will accept timepart MusicXML files, but will still return a
 * structure similar to parttime.
 */
const xmldom_1 = require("xmldom");
function parseScore(score) {
    let dom = xmlToParttimeDoc(score);
    return xmlToScoreTimewise(dom.documentElement);
}
exports.parseScore = parseScore;
/**
 * Reads a document, and returns header information.
 *
 * ScoreHeader is a subset of ScoreTimewise, so you can always just call MusicXML.parse.score.
 * This function is a bit faster though, if you only care about metadata.
 */
function parseScoreHeader(score) {
    return xmlToScoreHeader(xmlToDoc(score).documentElement);
}
exports.parseScoreHeader = parseScoreHeader;
/**
 * Converts a MusicXML <measure /> from a **parttime** document into JSON.
 */
function parseMeasure(str) {
    return xmlToMeasure(xmlToDoc(str).documentElement);
}
exports.parseMeasure = parseMeasure;
/**
 * Converts a MusicXML <note /> into JSON.
 */
function parseNote(str) {
    return xmlToNote(xmlToDoc(str).documentElement);
}
exports.parseNote = parseNote;
/**
 * Converts a MusicXML <clef /> into JSON.
 */
function parseClef(str) {
    return xmlToClef(xmlToDoc(str).documentElement);
}
exports.parseClef = parseClef;
/**
 * Converts a MusicXML <time /> into JSON.
 */
function parseTime(str) {
    return xmlToTime(xmlToDoc(str).documentElement);
}
exports.parseTime = parseTime;
/**
 * Converts a MusicXML <key /> into JSON.
 */
function parseKey(str) {
    return xmlToKey(xmlToDoc(str).documentElement);
}
exports.parseKey = parseKey;
/**
 * Converts a MusicXML <part-symbol /> into JSON.
 */
function parsePartSymbol(str) {
    return xmlToPartSymbol(xmlToDoc(str).documentElement);
}
exports.parsePartSymbol = parsePartSymbol;
/**
 * Converts a MusicXML <backup /> into JSON.
 */
function parseBackup(str) {
    return xmlToBackup(xmlToDoc(str).documentElement);
}
exports.parseBackup = parseBackup;
/**
 * Converts a MusicXML <harmony /> into JSON.
 */
function parseHarmony(str) {
    return xmlToHarmony(xmlToDoc(str).documentElement);
}
exports.parseHarmony = parseHarmony;
/**
 * Converts a MusicXML <forward /> into JSON.
 */
function parseForward(str) {
    return xmlToForward(xmlToDoc(str).documentElement);
}
exports.parseForward = parseForward;
/**
 * Converts a MusicXML <print /> into JSON.
 */
function parsePrint(str) {
    return xmlToPrint(xmlToDoc(str).documentElement);
}
exports.parsePrint = parsePrint;
/**
 * Converts a MusicXML <figured-bass /> into JSON.
 */
function parseFiguredBass(str) {
    return xmlToFiguredBass(xmlToDoc(str).documentElement);
}
exports.parseFiguredBass = parseFiguredBass;
/**
 * Converts a MusicXML <direction /> into JSON.
 */
function parseDirection(str) {
    return xmlToDirection(xmlToDoc(str).documentElement);
}
exports.parseDirection = parseDirection;
/**
 * Converts a MusicXML <attributes /> object into JSON.
 */
function parseAttributes(str) {
    return xmlToAttributes(xmlToDoc(str).documentElement);
}
exports.parseAttributes = parseAttributes;
/**
 * Converts a MusicXML <sound /> into JSON.
 */
function parseSound(str) {
    return xmlToSound(xmlToDoc(str).documentElement);
}
exports.parseSound = parseSound;
/**
 * Converts a MusicXML <barline /> into JSON.
 */
function parseBarline(str) {
    return xmlToBarline(xmlToDoc(str).documentElement);
}
exports.parseBarline = parseBarline;
/**
 * Converts a MusicXML <grouping /> into JSON.
 */
function parseGrouping(str) {
    return xmlToGrouping(xmlToDoc(str).documentElement);
}
exports.parseGrouping = parseGrouping;
/*---- Serialization API ------------------------------------------------------------------------*/
function serializeScore(score, parttime = false) {
    let timewise = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE score-timewise
  PUBLIC "-//Recordare//DTD MusicXML 3.0 Timewise//EN" "http://www.musicxml.org/dtds/timewise.dtd">
<score-timewise version="3.0">
${scoreHeaderToXML(score)
        .join("\n")
        .split("\n")
        .map((line) => "  " + line)
        .join("\n")}
${score.measures
        .map((measure) => measureToXML(measure))
        .join("\n")
        .split("\n")
        .map((line) => "  " + line)
        .join("\n")}
</score-timewise>`;
    if (!parttime) {
        return timewise;
    }
    return timewiseToPartwise(timewise);
}
exports.serializeScore = serializeScore;
function serializeScoreHeader(scoreHeader) {
    return scoreHeaderToXML(scoreHeader).join("\n");
}
exports.serializeScoreHeader = serializeScoreHeader;
exports.serializeMeasure = measureToXML;
exports.serializeNote = noteToXML;
exports.serializeClef = clefToXML;
exports.serializeTime = timeToXML;
exports.serializeKey = keyToXML;
exports.serializePartSymbol = (partSymbolToXML);
exports.serializeBackup = backupToXML;
exports.serializeHarmony = harmonyToXML;
exports.serializeForward = forwardToXML;
exports.serializePrint = printToXML;
exports.serializeFiguredBass = (figuredBassToXML);
exports.serializeDirection = (directionToXML);
exports.serializeAttributes = (attributesToXML);
exports.serializeSound = soundToXML;
exports.serializeBarline = barlineToXML;
exports.serializeGrouping = groupingToXML;
let process;
let isIE = typeof window !== "undefined" && "ActiveXObject" in window;
let isNode = typeof window === "undefined" ||
    (typeof process !== "undefined" && !process.browser);
var xmlToParttimeDoc;
var timewiseToPartwise;
var xmlToDoc;
(function init() {
    let parttimeXSLBuffer = '<?xml version="1.0" encoding="UTF-8"?> <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> <xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="no" standalone="no" doctype-system="http://www.musicxml.org/dtds/timewise.dtd" doctype-public="-//Recordare//DTD MusicXML 3.0 Timewise//EN" /> <xsl:template match="/"> <xsl:apply-templates select="./score-partwise"/> <xsl:apply-templates select="./score-timewise"/> </xsl:template> <xsl:template match="score-timewise"> <xsl:copy-of select="." /> </xsl:template> <xsl:template match="text()"> <xsl:value-of select="." /> </xsl:template> <xsl:template match="*|@*|comment()|processing-instruction()"> <xsl:copy><xsl:apply-templates select="*|@*|comment()|processing-instruction()|text()" /></xsl:copy> </xsl:template> <xsl:template match="score-partwise"> <xsl:element name="score-timewise"> <xsl:apply-templates select="@version[.!=\'1.0\']"/> <xsl:apply-templates select="work"/> <xsl:apply-templates select="movement-number"/> <xsl:apply-templates select="movement-title"/> <xsl:apply-templates select="identification"/> <xsl:apply-templates select="defaults"/> <xsl:apply-templates select="credit"/> <xsl:apply-templates select="part-list"/> <xsl:for-each select="part[1]/measure"> <xsl:variable name="measure-number"> <xsl:value-of select="@number"/> </xsl:variable> <xsl:element name="measure"> <xsl:attribute name="number"> <xsl:value-of select="$measure-number"/> </xsl:attribute> <xsl:if test="@implicit[. = \'yes\']"> <xsl:attribute name="implicit"> <xsl:value-of select="@implicit"/> </xsl:attribute> </xsl:if> <xsl:if test="@non-controlling[. = \'yes\']"> <xsl:attribute name="non-controlling"> <xsl:value-of select="@non-controlling"/> </xsl:attribute> </xsl:if> <xsl:if test="@width"> <xsl:attribute name="width"> <xsl:value-of select="@width"/> </xsl:attribute> </xsl:if> <xsl:for-each select="../../part/measure"> <xsl:if test="@number=$measure-number"> <xsl:element name="part"> <xsl:attribute name="id"> <xsl:value-of select="parent::part/@id"/> </xsl:attribute> <xsl:apply-templates /> </xsl:element> </xsl:if> </xsl:for-each> </xsl:element> </xsl:for-each> </xsl:element> </xsl:template> </xsl:stylesheet>';
    let timepartXSLBuffer = '<?xml version="1.0" encoding="UTF-8"?> <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> <xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="no" standalone="no" doctype-system="http://www.musicxml.org/dtds/partwise.dtd" doctype-public="-//Recordare//DTD MusicXML 3.0 Partwise//EN" /> <xsl:template match="/"> <xsl:apply-templates select="./score-partwise"/> <xsl:apply-templates select="./score-timewise"/> </xsl:template> <xsl:template match="score-partwise"> <xsl:copy-of select="." /> </xsl:template> <xsl:template match="text()"> <xsl:value-of select="." /> </xsl:template> <xsl:template match="*|@*|comment()|processing-instruction()"> <xsl:copy><xsl:apply-templates select="*|@*|comment()|processing-instruction()|text()" /></xsl:copy> </xsl:template> <xsl:template match="score-timewise"> <xsl:element name="score-partwise"> <xsl:apply-templates select="@version[.!=\'1.0\']"/> <xsl:apply-templates select="work"/> <xsl:apply-templates select="movement-number"/> <xsl:apply-templates select="movement-title"/> <xsl:apply-templates select="identification"/> <xsl:apply-templates select="defaults"/> <xsl:apply-templates select="credit"/> <xsl:apply-templates select="part-list"/> <xsl:for-each select="measure[1]/part"> <xsl:variable name="part-id"> <xsl:value-of select="@id"/> </xsl:variable> <xsl:element name="part"> <xsl:copy-of select="@id" /> <xsl:for-each select="../../measure/part"> <xsl:if test="@id=$part-id"> <xsl:element name="measure"> <xsl:attribute name="number"> <xsl:value-of select="parent::measure/@number"/> </xsl:attribute> <xsl:if test="parent::measure/@implicit[. = \'yes\']"> <xsl:attribute name="implicit"> <xsl:value-of select="parent::measure/@implicit"/> </xsl:attribute> </xsl:if> <xsl:if test="parent::measure/@non-controlling[. = \'yes\']"> <xsl:attribute name="non-controlling"> <xsl:value-of select="parent::measure/@non-controlling"/> </xsl:attribute> </xsl:if> <xsl:if test="parent::measure/@width"> <xsl:attribute name="width"> <xsl:value-of select="parent::measure/@width"/> </xsl:attribute> </xsl:if> <xsl:apply-templates /> </xsl:element> </xsl:if> </xsl:for-each> </xsl:element> </xsl:for-each> </xsl:element> </xsl:template> </xsl:stylesheet>';
    let spawnSync = require("child_process").spawnSync;
    let path = require("path");
    xmlToDoc = function (str) {
        return new xmldom_1.DOMParser().parseFromString(str, "text/xml");
    };
    xmlToParttimeDoc = function (str) {
        let res = spawnSync("xsltproc", [
            "--nonet",
            path.join(__dirname, "..", "vendor", "musicxml-dtd", "parttime.xsl"),
            "-",
        ], {
            input: str,
            env: {
                XML_CATALOG_FILES: path.join(__dirname, "..", "vendor", "musicxml-dtd", "catalog.xml"),
            },
        });
        if (res.error) {
            throw res.error;
        }
        return xmlToDoc(res.stdout.toString());
    };
    timewiseToPartwise = function (str) {
        let res = spawnSync("xsltproc", [
            "--nonet",
            path.join(__dirname, "..", "vendor", "musicxml-dtd", "parttime.xsl"),
            "-",
        ], {
            input: str,
            env: {
                XML_CATALOG_FILES: path.join(__dirname, "..", "vendor", "musicxml-dtd", "catalog.xml"),
            },
        });
        if (res.error) {
            throw res.error;
        }
        return res.stdout.toString();
    };
})();
function popFront(t) {
    return t.slice(1);
}
function getString(ch, required) {
    return (ch.nodeType === ch.ATTRIBUTE_NODE ? ch.value : ch.textContent).trim();
}
function getNumber(ch, required) {
    let s = getString(ch, required);
    if (s.toLowerCase().indexOf("0x") === 0) {
        return parseInt(s, 16);
    }
    else {
        return parseFloat(s);
    }
}
function toCamelCase(input) {
    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
        return group1.toUpperCase();
    });
}
/**
 * The start-stop entity is used for musical elements that
 * can either start or stop, such as slurs, tuplets, and
 * wedges.
 *
 * See also start-stop-continue and start-stop-single.
 *
 * The values of start and stop refer to how an
 * element appears in musical score order, not in MusicXML
 * document order. An element with a stop attribute may
 * precede the corresponding element with a start attribute
 * within a MusicXML document. This is particularly common
 * in multi-staff music. For example, the stopping point for
 * a slur may appear in staff 1 before the starting point for
 * the slur appears in staff 2 later in the document.
 */
var StartStop;
(function (StartStop) {
    StartStop[StartStop["Start"] = 0] = "Start";
    StartStop[StartStop["Stop"] = 1] = "Stop";
})(StartStop || (exports.StartStop = StartStop = {}));
/**
 * The start-stop-continue (as opposed to the start-stop entity)
 * entity is used when there is a need to refer to an
 * intermediate point in the symbol, as for complex slurs
 * or for specifying formatting of symbols across system
 * breaks.
 *
 * The values of start, stop, and continue refer to how an
 * element appears in musical score order, not in MusicXML
 * document order. An element with a stop attribute may
 * precede the corresponding element with a start attribute
 * within a MusicXML document. This is particularly common
 * in multi-staff music. For example, the stopping point for
 * a slur may appear in staff 1 before the starting point for
 * the slur appears in staff 2 later in the document.
 */
var StartStopContinue;
(function (StartStopContinue) {
    StartStopContinue[StartStopContinue["Start"] = 0] = "Start";
    StartStopContinue[StartStopContinue["Stop"] = 1] = "Stop";
    StartStopContinue[StartStopContinue["Continue"] = 2] = "Continue";
})(StartStopContinue || (exports.StartStopContinue = StartStopContinue = {}));
/**
 * The start-stop-single entity (as opposed to start-stop
 * and start-stop-continue) is used when the same
 * element is used for multi-note and single-note notations,
 * as for tremolos.
 *
 * The values of start and stop refer to how an
 * element appears in musical score order, not in MusicXML
 * document order. An element with a stop attribute may
 * precede the corresponding element with a start attribute
 * within a MusicXML document. This is particularly common
 * in multi-staff music. For example, the stopping point for
 * a slur may appear in staff 1 before the starting point for
 * the slur appears in staff 2 later in the document.
 */
var StartStopSingle;
(function (StartStopSingle) {
    StartStopSingle[StartStopSingle["Single"] = 3] = "Single";
    StartStopSingle[StartStopSingle["Start"] = 0] = "Start";
    StartStopSingle[StartStopSingle["Stop"] = 1] = "Stop";
})(StartStopSingle || (exports.StartStopSingle = StartStopSingle = {}));
/**
 * The symbol-size entity is used to indicate full vs.
 * cue-sized vs. oversized symbols. The large value
 * for oversized symbols was added in version 1.1.
 */
var SymbolSize;
(function (SymbolSize) {
    /**
     * Context-dependant.
     */
    SymbolSize[SymbolSize["Unspecified"] = 0] = "Unspecified";
    SymbolSize[SymbolSize["Full"] = 1] = "Full";
    SymbolSize[SymbolSize["Cue"] = 2] = "Cue";
    /**
     * Oversized.
     */
    SymbolSize[SymbolSize["Large"] = 3] = "Large";
})(SymbolSize || (exports.SymbolSize = SymbolSize = {}));
/**
 * The above-below type is used to indicate whether one
 * element appears above or below another element.
 */
var AboveBelow;
(function (AboveBelow) {
    AboveBelow[AboveBelow["Above"] = 1] = "Above";
    AboveBelow[AboveBelow["Below"] = 2] = "Below";
    AboveBelow[AboveBelow["Unspecified"] = 0] = "Unspecified";
})(AboveBelow || (exports.AboveBelow = AboveBelow = {}));
/**
 * Specifies orientation.
 */
var OverUnder;
(function (OverUnder) {
    OverUnder[OverUnder["Over"] = 1] = "Over";
    OverUnder[OverUnder["Under"] = 2] = "Under";
    OverUnder[OverUnder["Unspecified"] = 0] = "Unspecified";
})(OverUnder || (exports.OverUnder = OverUnder = {}));
/**
 * The up-down entity is used for arrow direction,
 * indicating which way the tip is pointing.
 */
var UpDown;
(function (UpDown) {
    UpDown[UpDown["Down"] = 1] = "Down";
    UpDown[UpDown["Up"] = 0] = "Up";
})(UpDown || (exports.UpDown = UpDown = {}));
/**
 * The top-bottom entity is used to indicate the top or
 * bottom part of a vertical shape like non-arpeggiate.
 */
var TopBottom;
(function (TopBottom) {
    TopBottom[TopBottom["Top"] = 0] = "Top";
    TopBottom[TopBottom["Bottom"] = 1] = "Bottom";
})(TopBottom || (exports.TopBottom = TopBottom = {}));
/**
 * The left-right entity is used to indicate whether one
 * element appears to the left or the right of another
 * element.
 */
var LeftRight;
(function (LeftRight) {
    LeftRight[LeftRight["Right"] = 1] = "Right";
    LeftRight[LeftRight["Left"] = 0] = "Left";
})(LeftRight || (exports.LeftRight = LeftRight = {}));
/**
 * The enclosure-shape entity describes the shape and
 * presence / absence of an enclosure around text. A bracket
 * enclosure is similar to a rectangle with the bottom line
 * missing, as is common in jazz notation.
 */
var EnclosureShape;
(function (EnclosureShape) {
    EnclosureShape[EnclosureShape["Circle"] = 3] = "Circle";
    EnclosureShape[EnclosureShape["Bracket"] = 4] = "Bracket";
    EnclosureShape[EnclosureShape["Triangle"] = 5] = "Triangle";
    EnclosureShape[EnclosureShape["Diamond"] = 6] = "Diamond";
    EnclosureShape[EnclosureShape["None"] = 7] = "None";
    EnclosureShape[EnclosureShape["Square"] = 1] = "Square";
    EnclosureShape[EnclosureShape["Oval"] = 2] = "Oval";
    EnclosureShape[EnclosureShape["Rectangle"] = 0] = "Rectangle";
})(EnclosureShape || (exports.EnclosureShape = EnclosureShape = {}));
var NormalItalic;
(function (NormalItalic) {
    NormalItalic[NormalItalic["Italic"] = 1] = "Italic";
    NormalItalic[NormalItalic["Normal"] = 0] = "Normal";
})(NormalItalic || (exports.NormalItalic = NormalItalic = {}));
var NormalBold;
(function (NormalBold) {
    NormalBold[NormalBold["Bold"] = 2] = "Bold";
    NormalBold[NormalBold["Normal"] = 0] = "Normal";
})(NormalBold || (exports.NormalBold = NormalBold = {}));
var LeftCenterRight;
(function (LeftCenterRight) {
    LeftCenterRight[LeftCenterRight["Right"] = 1] = "Right";
    LeftCenterRight[LeftCenterRight["Center"] = 2] = "Center";
    LeftCenterRight[LeftCenterRight["Left"] = 0] = "Left";
})(LeftCenterRight || (exports.LeftCenterRight = LeftCenterRight = {}));
var TopMiddleBottomBaseline;
(function (TopMiddleBottomBaseline) {
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Top"] = 0] = "Top";
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Middle"] = 1] = "Middle";
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Baseline"] = 3] = "Baseline";
    TopMiddleBottomBaseline[TopMiddleBottomBaseline["Bottom"] = 2] = "Bottom";
})(TopMiddleBottomBaseline || (exports.TopMiddleBottomBaseline = TopMiddleBottomBaseline = {}));
var DirectionMode;
(function (DirectionMode) {
    DirectionMode[DirectionMode["Lro"] = 2] = "Lro";
    DirectionMode[DirectionMode["Rlo"] = 3] = "Rlo";
    DirectionMode[DirectionMode["Ltr"] = 0] = "Ltr";
    DirectionMode[DirectionMode["Rtl"] = 1] = "Rtl";
})(DirectionMode || (exports.DirectionMode = DirectionMode = {}));
var StraightCurved;
(function (StraightCurved) {
    StraightCurved[StraightCurved["Curved"] = 1] = "Curved";
    StraightCurved[StraightCurved["Straight"] = 0] = "Straight";
})(StraightCurved || (exports.StraightCurved = StraightCurved = {}));
var SolidDashedDottedWavy;
(function (SolidDashedDottedWavy) {
    SolidDashedDottedWavy[SolidDashedDottedWavy["Dashed"] = 1] = "Dashed";
    SolidDashedDottedWavy[SolidDashedDottedWavy["Wavy"] = 3] = "Wavy";
    SolidDashedDottedWavy[SolidDashedDottedWavy["Dotted"] = 2] = "Dotted";
    SolidDashedDottedWavy[SolidDashedDottedWavy["Solid"] = 0] = "Solid";
})(SolidDashedDottedWavy || (exports.SolidDashedDottedWavy = SolidDashedDottedWavy = {}));
var NormalAngledSquare;
(function (NormalAngledSquare) {
    NormalAngledSquare[NormalAngledSquare["Angled"] = 1] = "Angled";
    NormalAngledSquare[NormalAngledSquare["Square"] = 2] = "Square";
    NormalAngledSquare[NormalAngledSquare["Normal"] = 0] = "Normal";
})(NormalAngledSquare || (exports.NormalAngledSquare = NormalAngledSquare = {}));
var UprightInverted;
(function (UprightInverted) {
    UprightInverted[UprightInverted["Upright"] = 0] = "Upright";
    UprightInverted[UprightInverted["Inverted"] = 1] = "Inverted";
})(UprightInverted || (exports.UprightInverted = UprightInverted = {}));
var UpperMainBelow;
(function (UpperMainBelow) {
    UpperMainBelow[UpperMainBelow["Main"] = 1] = "Main";
    UpperMainBelow[UpperMainBelow["Below"] = 2] = "Below";
    UpperMainBelow[UpperMainBelow["Upper"] = 0] = "Upper";
})(UpperMainBelow || (exports.UpperMainBelow = UpperMainBelow = {}));
var WholeHalfUnison;
(function (WholeHalfUnison) {
    WholeHalfUnison[WholeHalfUnison["Unison"] = 2] = "Unison";
    WholeHalfUnison[WholeHalfUnison["Whole"] = 0] = "Whole";
    WholeHalfUnison[WholeHalfUnison["Half"] = 1] = "Half";
})(WholeHalfUnison || (exports.WholeHalfUnison = WholeHalfUnison = {}));
var WholeHalfNone;
(function (WholeHalfNone) {
    WholeHalfNone[WholeHalfNone["None"] = 3] = "None";
    WholeHalfNone[WholeHalfNone["Whole"] = 0] = "Whole";
    WholeHalfNone[WholeHalfNone["Half"] = 1] = "Half";
})(WholeHalfNone || (exports.WholeHalfNone = WholeHalfNone = {}));
function xmlToEncodingDate(node) {
    let text = getString(node, true);
    if (text.length < 10) {
        return null;
    }
    return {
        year: parseFloat(text.slice(0, 4)),
        month: parseFloat(text.slice(5, 7)),
        day: parseFloat(text.slice(8, 10)),
    };
}
function xmlToMeasure(node) {
    let ret = {};
    let foundImplicit = false;
    let foundNonControlling = false;
    let foundNumber = false;
    let foundWidth = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "part") {
            let dataPart = xmlToPart(ch);
            ret.parts = ret.parts || {};
            ret.parts[ch.getAttribute("id")] = dataPart;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getString(ch2, true);
            ret.number = dataNumber;
            foundNumber = true;
        }
        if (ch2.name === "implicit") {
            let dataImplicit = xmlToYesNo(ch2, true);
            ret.implicit = dataImplicit;
            foundImplicit = true;
        }
        if (ch2.name === "width") {
            let dataWidth = getNumber(ch2, true);
            ret.width = dataWidth;
            foundWidth = true;
        }
        if (ch2.name === "non-controlling") {
            let dataNonControlling = xmlToYesNo(ch2, true);
            ret.nonControlling = dataNonControlling;
            foundNonControlling = true;
        }
    }
    if (!foundNumber) {
        ret.number = "";
    }
    if (!foundImplicit) {
        ret.implicit = false;
    }
    if (!foundNonControlling) {
        ret.nonControlling = false;
    }
    if (!foundWidth) {
        ret.width = null;
    }
    return ret;
}
function xmlToYesNo(p, required) {
    let s = getString(p, true);
    if (s == "no") {
        return false;
    }
    if (s == "yes") {
        return true;
    }
    return false;
}
function xmlToNoteheadText(p) {
    // TODO
    return null;
}
function xmlToPartNameDisplay(p) {
    // TODO
    return null;
}
function xmlToPartAbbreviationDisplay(p) {
    // TODO
    return null;
}
function xmlToGroupNameDisplay(p) {
    // TODO
    return null;
}
function xmlToGroupAbbreviationDisplay(p) {
    // TODO
    return null;
}
function xmlToLyric(node) {
    let ret = {};
    let foundNumber_ = false;
    let foundJustify = false;
    let foundDefaultX = false;
    let foundRelativeY = false;
    let foundDefaultY = false;
    let foundRelativeX = false;
    let foundPlacement = false;
    let foundColor = false;
    let foundPrintObject = false;
    let foundName = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "footnote") {
            let dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            let dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber_ = getNumber(ch2, true);
            ret.number = dataNumber_;
            foundNumber_ = true;
        }
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
            foundDefaultX = true;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
            foundRelativeY = true;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
            foundDefaultY = true;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
            foundRelativeX = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "name") {
            let dataName = getString(ch2, true);
            ret.name = dataName;
            foundName = true;
        }
    }
    ret.lyricParts = xmlToLyricParts(node);
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundDefaultX) {
        ret.defaultX = NaN;
    }
    if (!foundRelativeY) {
        ret.relativeY = 0;
    }
    if (!foundDefaultY) {
        ret.defaultY = NaN;
    }
    if (!foundRelativeX) {
        ret.relativeX = 0;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundName) {
        ret.name = "";
    }
    return ret;
}
function getStartStop(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "start") {
        return StartStop.Start;
    }
    if (s == "stop") {
        return StartStop.Stop;
    }
    return fallbackVal;
}
function getStartStopContinue(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "start") {
        return StartStopContinue.Start;
    }
    if (s == "stop") {
        return StartStopContinue.Stop;
    }
    if (s == "continue") {
        return StartStopContinue.Continue;
    }
    return fallbackVal;
}
function getStartStopSingle(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "single") {
        return StartStopSingle.Single;
    }
    if (s == "start") {
        return StartStopSingle.Start;
    }
    if (s == "stop") {
        return StartStopSingle.Stop;
    }
    return fallbackVal;
}
function getSymbolSize(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "unspecified") {
        return SymbolSize.Unspecified;
    }
    if (s == "full") {
        return SymbolSize.Full;
    }
    if (s == "cue") {
        return SymbolSize.Cue;
    }
    if (s == "large") {
        return SymbolSize.Large;
    }
    return fallbackVal;
}
function getAboveBelow(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "above") {
        return AboveBelow.Above;
    }
    if (s == "below") {
        return AboveBelow.Below;
    }
    if (s == "unspecified") {
        return AboveBelow.Unspecified;
    }
    return fallbackVal;
}
function getUpDown(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "down") {
        return UpDown.Down;
    }
    if (s == "up") {
        return UpDown.Up;
    }
    return fallbackVal;
}
function getOverUnder(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "over") {
        return OverUnder.Over;
    }
    if (s == "under") {
        return OverUnder.Under;
    }
    if (s == "unspecified") {
        return OverUnder.Unspecified;
    }
    return fallbackVal;
}
function getTopBottom(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "top") {
        return TopBottom.Top;
    }
    if (s == "bottom") {
        return TopBottom.Bottom;
    }
    return fallbackVal;
}
function getLeftRight(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return LeftRight.Right;
    }
    if (s == "left") {
        return LeftRight.Left;
    }
    return fallbackVal;
}
/**
 * The number-of-lines entity is used to specify the
 * number of lines in text decoration attributes.
 */
function verifyNumberOfLines(m) {
    // assert(m >= 0 && m <= 3);
}
function xmlToNumberOfLines(node) {
    let str = node.textContent;
    let num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
function verifyRotation(m) {
    // assert(m >= -180 && m <= 180);
}
function xmlToRotation(node) {
    let str = node.textContent;
    let num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
function getEnclosureShape(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "circle") {
        return EnclosureShape.Circle;
    }
    if (s == "bracket") {
        return EnclosureShape.Bracket;
    }
    if (s == "triangle") {
        return EnclosureShape.Triangle;
    }
    if (s == "diamond") {
        return EnclosureShape.Diamond;
    }
    if (s == "none") {
        return EnclosureShape.None;
    }
    if (s == "square") {
        return EnclosureShape.Square;
    }
    if (s == "oval") {
        return EnclosureShape.Oval;
    }
    if (s == "rectangle") {
        return EnclosureShape.Rectangle;
    }
    return fallbackVal;
}
function getNormalItalic(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "italic") {
        return NormalItalic.Italic;
    }
    if (s == "normal") {
        return NormalItalic.Normal;
    }
    return fallbackVal;
}
function getNormalBold(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "bold") {
        return NormalBold.Bold;
    }
    if (s == "normal") {
        return NormalBold.Normal;
    }
    return fallbackVal;
}
/**
 * Slurs, tuplets, and many other features can be
 * concurrent and overlapping within a single musical
 * part. The number-level attribute distinguishes up to
 * six concurrent objects of the same type. A reading
 * program should be prepared to handle cases where
 * the number-levels stop in an arbitrary order.
 * Different numbers are needed when the features
 * overlap in MusicXML document order. When a number-level
 * value is implied, the value is 1 by default.
 */
function verifyNumberLevel(m) {
    // assert(m >= 1 && m <= 6);
}
function xmlToNumberLevel(node) {
    let str = node.textContent;
    let num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 * The MusicXML format supports eight levels of beaming, up
 * to 1024th notes. Unlike the number-level attribute, the
 * beam-level attribute identifies concurrent beams in a beam
 * group. It does not distinguish overlapping beams such as
 * grace notes within regular notes, or beams used in different
 * voices.
 */
function verifyBeamLevel(m) {
    // assert(m >= 1 && m <= 8);
}
function xmlToBeamLevel(node) {
    let str = node.textContent;
    let num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
function xmlToPosition(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
    }
    return ret;
}
function xmlToPlacement(node) {
    let ret = {};
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToDirectiveEntity(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "directive") {
            let dataDirective = xmlToYesNo(ch2);
            ret.directive = dataDirective;
        }
    }
    return ret;
}
function xmlToBezier(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "bezier-x2") {
            let dataBezierX2 = getNumber(ch2, true);
            ret.bezierX2 = dataBezierX2;
        }
        if (ch2.name === "bezier-offset") {
            let dataBezierOffset = getNumber(ch2, true);
            ret.bezierOffset = dataBezierOffset;
        }
        if (ch2.name === "bezier-offset2") {
            let dataBezierOffset2 = getNumber(ch2, true);
            ret.bezierOffset2 = dataBezierOffset2;
        }
        if (ch2.name === "bezier-x") {
            let dataBezierX = getNumber(ch2, true);
            ret.bezierX = dataBezierX;
        }
        if (ch2.name === "bezier-y") {
            let dataBezierY = getNumber(ch2, true);
            ret.bezierY = dataBezierY;
        }
        if (ch2.name === "bezier-y2") {
            let dataBezierY2 = getNumber(ch2, true);
            ret.bezierY2 = dataBezierY2;
        }
    }
    return ret;
}
function xmlToOrientation(node) {
    let ret = {};
    let foundOrientation = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "orientation") {
            let dataOrientation = getOverUnder(ch2, OverUnder.Unspecified);
            ret.orientation = dataOrientation;
            foundOrientation = true;
        }
    }
    if (!foundOrientation) {
        ret.orientation = OverUnder.Unspecified;
    }
    return ret;
}
function xmlToFont(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    return ret;
}
function getLeftCenterRight(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return LeftCenterRight.Right;
    }
    if (s == "center") {
        return LeftCenterRight.Center;
    }
    if (s == "left") {
        return LeftCenterRight.Left;
    }
    return fallbackVal;
}
function getTopMiddleBottomBaseline(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "top") {
        return TopMiddleBottomBaseline.Top;
    }
    if (s == "middle") {
        return TopMiddleBottomBaseline.Middle;
    }
    if (s == "baseline") {
        return TopMiddleBottomBaseline.Baseline;
    }
    if (s == "bottom") {
        return TopMiddleBottomBaseline.Bottom;
    }
    return fallbackVal;
}
function getDirectionMode(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "lro") {
        return DirectionMode.Lro;
    }
    if (s == "rlo") {
        return DirectionMode.Rlo;
    }
    if (s == "ltr") {
        return DirectionMode.Ltr;
    }
    if (s == "rtl") {
        return DirectionMode.Rtl;
    }
    return fallbackVal;
}
function getStraightCurved(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "curved") {
        return StraightCurved.Curved;
    }
    if (s == "straight") {
        return StraightCurved.Straight;
    }
    return fallbackVal;
}
function getSolidDashedDottedWavy(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "dashed") {
        return SolidDashedDottedWavy.Dashed;
    }
    if (s == "wavy") {
        return SolidDashedDottedWavy.Wavy;
    }
    if (s == "dotted") {
        return SolidDashedDottedWavy.Dotted;
    }
    if (s == "solid") {
        return SolidDashedDottedWavy.Solid;
    }
    return fallbackVal;
}
function getNormalAngledSquare(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "angled") {
        return NormalAngledSquare.Angled;
    }
    if (s == "square") {
        return NormalAngledSquare.Square;
    }
    if (s == "normal") {
        return NormalAngledSquare.Normal;
    }
    return fallbackVal;
}
function getUprightInverted(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "upright") {
        return UprightInverted.Upright;
    }
    if (s == "inverted") {
        return UprightInverted.Inverted;
    }
    return fallbackVal;
}
function getUpperMainBelow(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "main") {
        return UpperMainBelow.Main;
    }
    if (s == "below") {
        return UpperMainBelow.Below;
    }
    if (s == "upper") {
        return UpperMainBelow.Upper;
    }
    return fallbackVal;
}
function getWholeHalfUnison(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "unison") {
        return WholeHalfUnison.Unison;
    }
    if (s == "whole") {
        return WholeHalfUnison.Whole;
    }
    if (s == "half") {
        return WholeHalfUnison.Half;
    }
    return fallbackVal;
}
function getWholeHalfNone(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return WholeHalfNone.None;
    }
    if (s == "whole") {
        return WholeHalfNone.Whole;
    }
    if (s == "half") {
        return WholeHalfNone.Half;
    }
    return fallbackVal;
}
function xmlToColor(node) {
    let ret = {};
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToTextDecoration(node) {
    let ret = {};
    let foundUnderline = false;
    let foundOverline = false;
    let foundLineThrough = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "underline") {
            let dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            let dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            let dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    return ret;
}
function xmlToJustify(node) {
    let ret = {};
    let foundJustify = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    return ret;
}
function xmlToHalign(node) {
    let ret = {};
    let foundHalign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    return ret;
}
function xmlToValign(node) {
    let ret = {};
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToValignImage(node) {
    let ret = {};
    let foundValignImage = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "valign") {
            let dataValignImage = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valignImage = dataValignImage;
            foundValignImage = true;
        }
    }
    if (!foundValignImage) {
        ret.valignImage = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToLetterSpacing(node) {
    let ret = {};
    let foundLetterSpacing = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "letter-spacing") {
            let dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    return ret;
}
function xmlToLineHeight(node) {
    let ret = {};
    let foundLineHeight = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "line-height") {
            let dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    return ret;
}
function xmlToTextDirection(node) {
    let ret = {};
    let foundDir = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "dir") {
            let dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    return ret;
}
function xmlToTextRotation(node) {
    let ret = {};
    let foundRotation = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "rotation") {
            let dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    return ret;
}
function xmlToEnclosure(node) {
    let ret = {};
    let foundEnclosure = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "enclosure") {
            let dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToPrintStyle(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToPrintStyleAlign(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToLineShape(node) {
    let ret = {};
    let foundLineShape = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            let dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    return ret;
}
function xmlToDashedFormatting(node) {
    let ret = {};
    let foundDashLength = false;
    let foundSpaceLength = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    return ret;
}
function xmlToPrintObject(node) {
    let ret = {};
    let foundPrintObject = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    return ret;
}
function xmlToPrintSpacing(node) {
    let ret = {};
    let foundPrintSpacing = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "print-spacing") {
            let dataPrintSpacing = xmlToYesNo(ch2);
            ret.printSpacing = dataPrintSpacing;
            foundPrintSpacing = true;
        }
    }
    if (!foundPrintSpacing) {
        ret.printSpacing = true;
    }
    return ret;
}
function xmlToTextFormatting(node) {
    let ret = {};
    let foundJustify = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    let foundUnderline = false;
    let foundOverline = false;
    let foundLineThrough = false;
    let foundRotation = false;
    let foundLetterSpacing = false;
    let foundLineHeight = false;
    let foundDir = false;
    let foundEnclosure = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            let dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            let dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            let dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            let dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            let dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            let dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            let dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            let dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToLevelDisplay(node) {
    let ret = {};
    let foundBracket = false;
    let foundSize = false;
    let foundParentheses = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "bracket") {
            let dataBracket = xmlToYesNo(ch2);
            ret.bracket = dataBracket;
            foundBracket = true;
        }
        if (ch2.name === "size") {
            let dataSize = getSymbolSize(ch2, SymbolSize.Unspecified);
            ret.size = dataSize;
            foundSize = true;
        }
        if (ch2.name === "parentheses") {
            let dataParentheses = xmlToYesNo(ch2);
            ret.parentheses = dataParentheses;
            foundParentheses = true;
        }
    }
    if (!foundBracket) {
        ret.bracket = false;
    }
    if (!foundSize) {
        ret.size = SymbolSize.Unspecified;
    }
    if (!foundParentheses) {
        ret.parentheses = false;
    }
    return ret;
}
function xmlToTrillSound(node) {
    let ret = {};
    let foundStartNote = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundTrillStep = false;
    let foundTwoNoteTurn = false;
    let foundSecondBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "start-note") {
            let dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            let dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            let dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            let dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 24;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 12;
    }
    return ret;
}
function xmlToBendSound(node) {
    let ret = {};
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundSecondBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "first-beat") {
            let dataSecondBeat = getNumber(ch2, true);
            ret.firstBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundSecondBeat) {
        ret.firstBeat = 25;
    }
    return ret;
}
function xmlToTimeOnly(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "time-only") {
            let dataTimeOnly = getString(ch2, true);
            ret.timeOnly = dataTimeOnly;
        }
    }
    return ret;
}
function xmlToDocumentAttributes(node) {
    let ret = {};
    let foundVersion_ = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "version") {
            let dataVersion = getString(ch2, true);
            ret.version = dataVersion;
            foundVersion_ = true;
        }
    }
    if (!foundVersion_) {
        ret.version = "1.0";
    }
    return ret;
}
function xmlToEditorial(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "footnote") {
            let dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            let dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToEditorialVoice(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "voice") {
            let dataVoice = getNumber(ch, true);
            ret.voice = dataVoice;
        }
        if (ch.nodeName === "footnote") {
            let dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            let dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToFootnote(node) {
    let ret = {};
    let foundJustify = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    let foundUnderline = false;
    let foundOverline = false;
    let foundLineThrough = false;
    let foundRotation = false;
    let foundLetterSpacing = false;
    let foundLineHeight = false;
    let foundDir = false;
    let foundEnclosure = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            let dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            let dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            let dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            let dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            let dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            let dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            let dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            let dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    let ch3 = node;
    let dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToLevel(node) {
    let ret = {};
    let foundBracket = false;
    let foundSize = false;
    let foundParentheses = false;
    let foundReference = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "bracket") {
            let dataBracket = xmlToYesNo(ch2);
            ret.bracket = dataBracket;
            foundBracket = true;
        }
        if (ch2.name === "size") {
            let dataSize = getSymbolSize(ch2, SymbolSize.Unspecified);
            ret.size = dataSize;
            foundSize = true;
        }
        if (ch2.name === "parentheses") {
            let dataParentheses = xmlToYesNo(ch2);
            ret.parentheses = dataParentheses;
            foundParentheses = true;
        }
        if (ch2.name === "reference") {
            let dataReference = xmlToYesNo(ch2);
            ret.reference = dataReference;
            foundReference = true;
        }
    }
    let ch3 = node;
    let dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundBracket) {
        ret.bracket = false;
    }
    if (!foundSize) {
        ret.size = SymbolSize.Unspecified;
    }
    if (!foundParentheses) {
        ret.parentheses = false;
    }
    if (!foundReference) {
        ret.reference = false;
    }
    return ret;
}
function xmlToFermata(node) {
    let ret = {};
    let foundShape = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundType = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            let dataType = getUprightInverted(ch2, UprightInverted.Upright);
            ret.type = dataType;
            foundType = true;
        }
    }
    let ch3 = node;
    let dataShape = getNormalAngledSquare(ch3, NormalAngledSquare.Normal);
    ret.shape = dataShape;
    if (!foundShape) {
        ret.shape = NormalAngledSquare.Normal;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundType) {
        ret.type = UprightInverted.Upright;
    }
    return ret;
}
function xmlToWavyLine(node) {
    let ret = {};
    let foundNumber_ = false;
    let foundPlacement = false;
    let foundColor = false;
    let foundStartNote = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundTrillStep = false;
    let foundTwoNoteTurn = false;
    let foundSecondBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "start-note") {
            let dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            let dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            let dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            let dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStopContinue(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToSegno(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToCoda(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToNormalDot(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToDynamics(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    let foundPlacement = false;
    let foundUnderline = false;
    let foundOverline = false;
    let foundLineThrough = false;
    let foundEnclosure = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "fp") {
            let dataFp = true;
            ret.fp = dataFp;
        }
        if (ch.nodeName === "pp") {
            let dataPp = true;
            ret.pp = dataPp;
        }
        if (ch.nodeName === "ppp") {
            let dataPpp = true;
            ret.ppp = dataPpp;
        }
        if (ch.nodeName === "fff") {
            let dataFff = true;
            ret.fff = dataFff;
        }
        if (ch.nodeName === "sf") {
            let dataSf = true;
            ret.sf = dataSf;
        }
        if (ch.nodeName === "rf") {
            let dataRf = true;
            ret.rf = dataRf;
        }
        if (ch.nodeName === "mp") {
            let dataMp = true;
            ret.mp = dataMp;
        }
        if (ch.nodeName === "sfpp") {
            let dataSfpp = true;
            ret.sfpp = dataSfpp;
        }
        if (ch.nodeName === "f") {
            let dataF = true;
            ret.f = dataF;
        }
        if (ch.nodeName === "ffffff") {
            let dataFfffff = true;
            ret.ffffff = dataFfffff;
        }
        if (ch.nodeName === "sfz") {
            let dataSfz = true;
            ret.sfz = dataSfz;
        }
        if (ch.nodeName === "ff") {
            let dataFf = true;
            ret.ff = dataFf;
        }
        if (ch.nodeName === "pppppp") {
            let dataPppppp = true;
            ret.pppppp = dataPppppp;
        }
        if (ch.nodeName === "rfz") {
            let dataRfz = true;
            ret.rfz = dataRfz;
        }
        if (ch.nodeName === "other-dynamics") {
            let dataOtherDynamics = getString(ch, true);
            ret.otherDynamics = dataOtherDynamics;
        }
        if (ch.nodeName === "fz") {
            let dataFz = true;
            ret.fz = dataFz;
        }
        if (ch.nodeName === "ppppp") {
            let dataPpppp = true;
            ret.ppppp = dataPpppp;
        }
        if (ch.nodeName === "mf") {
            let dataMf = true;
            ret.mf = dataMf;
        }
        if (ch.nodeName === "pppp") {
            let dataPppp = true;
            ret.pppp = dataPppp;
        }
        if (ch.nodeName === "fffff") {
            let dataFffff = true;
            ret.fffff = dataFffff;
        }
        if (ch.nodeName === "sffz") {
            let dataSffz = true;
            ret.sffz = dataSffz;
        }
        if (ch.nodeName === "sfp") {
            let dataSfp = true;
            ret.sfp = dataSfp;
        }
        if (ch.nodeName === "p") {
            let dataP = true;
            ret.p = dataP;
        }
        if (ch.nodeName === "ffff") {
            let dataFfff = true;
            ret.ffff = dataFfff;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "underline") {
            let dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            let dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            let dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "enclosure") {
            let dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToFingering(node) {
    let ret = {};
    let foundSubstitution = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundAlternate = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "substitution") {
            let dataSubstitution = xmlToYesNo(ch2);
            ret.substitution = dataSubstitution;
            foundSubstitution = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "alternate") {
            let dataAlternate = xmlToYesNo(ch2);
            ret.alternate = dataAlternate;
            foundAlternate = true;
        }
    }
    let ch3 = node;
    let dataFinger = getNumber(ch3, false);
    ret.finger = dataFinger;
    if (isNaN(ret.finger)) {
        ret.finger = -1;
    }
    if (!foundSubstitution) {
        ret.substitution = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundAlternate) {
        ret.alternate = false;
    }
    return ret;
}
function xmlToFret(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataFret = getNumber(ch3, true);
    ret.fret = dataFret;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToString(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    let ch3 = node;
    let dataStringNum = getNumber(ch3, true);
    ret.stringNum = dataStringNum;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToDisplayText(node) {
    let ret = {};
    let foundJustify = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    let foundUnderline = false;
    let foundOverline = false;
    let foundLineThrough = false;
    let foundRotation = false;
    let foundLetterSpacing = false;
    let foundLineHeight = false;
    let foundDir = false;
    let foundEnclosure = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            let dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            let dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            let dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            let dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            let dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            let dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            let dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            let dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    let ch3 = node;
    let dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToAccidentalText(node) {
    let ret = {};
    let foundJustify = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    let foundUnderline = false;
    let foundOverline = false;
    let foundLineThrough = false;
    let foundRotation = false;
    let foundLetterSpacing = false;
    let foundLineHeight = false;
    let foundDir = false;
    let foundEnclosure = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            let dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            let dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            let dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            let dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            let dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            let dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            let dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            let dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    let ch3 = node;
    let dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToMidiDevice(node) {
    let ret = {};
    let foundDeviceName = false;
    let foundPort = false;
    let foundId = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "port") {
            let dataPort = getNumber(ch2, true);
            ret.port = dataPort;
            foundPort = true;
        }
        if (ch2.name === "id") {
            let dataId = getNumber(ch2, true);
            ret.id = dataId;
            foundId = true;
        }
    }
    let ch3 = node;
    let dataDeviceName = getString(ch3, true);
    ret.deviceName = dataDeviceName;
    if (!foundDeviceName) {
        ret.deviceName = "";
    }
    if (!foundPort) {
        ret.port = NaN;
    }
    if (!foundId) {
        ret.id = NaN;
    }
    return ret;
}
/**
 * MIDI 1.0 channel numbers range from 1 to 16.
 */
function verifyMidiChannel(m) {
    // assert(m >= 1 && m <= 16);
}
function xmlToMidiChannel(node) {
    let str = node.textContent;
    let num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 *  midi 1.0 bank numbers range from 1 to 16,384.
 */
function verifyMidiBank(m) {
    // assert(m >= 1 && m <= 16384);
}
function xmlToMidiBank(node) {
    let str = node.textContent;
    let num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 *  MIDI 1.0 program numbers range from 1 to 128.
 */
function verifyMidiProgram(m) {
    // assert(m >= 1 && m <= 128);
}
function xmlToMidiProgram(node) {
    let str = node.textContent;
    let num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 * For unpitched instruments, specify a MIDI 1.0 note number
 * ranging from 1 to 128. It is usually used with MIDI banks for
 * percussion. Note that MIDI 1.0 note numbers are generally
 * specified from 0 to 127 rather than the 1 to 128 numbering
 * used in this element.
 */
function verifyMidiUnpitched(m) {
    // assert(m >= 1 && m <= 128);
}
function xmlToMidiUnpitched(node) {
    let str = node.textContent;
    let num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 * The volume value is a percentage of the maximum
 * ranging from 0 to 100, with decimal values allowed.
 * This corresponds to a scaling value for the MIDI 1.0
 * channel volume controller.
 */
function verifyVolume(m) {
    // assert(m >= 1 && m <= 100);
}
function xmlToVolume(node) {
    let str = node.textContent;
    let num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 * Pan and elevation allow placing of sound in a 3-D space
 * relative to the listener. Both are expressed in degrees
 * ranging from -180 to 180. For pan, 0 is straight ahead,
 * -90 is hard left, 90 is hard right, and -180 and 180
 * are directly behind the listener. For elevation, 0 is
 * level with the listener, 90 is directly above, and -90
 * is directly below.
 */
function verifyPan(m) {
    // assert(m >= -180 && m <= 180);
}
function xmlToPan(node) {
    let str = node.textContent;
    let num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
/**
 * Pan and elevation allow placing of sound in a 3-D space
 * relative to the listener. Both are expressed in degrees
 * ranging from -180 to 180. For pan, 0 is straight ahead,
 * -90 is hard left, 90 is hard right, and -180 and 180
 * are directly behind the listener. For elevation, 0 is
 * level with the listener, 90 is directly above, and -90
 * is directly below.
 */
function verifyElevation(m) {
    // assert(m >= -180 && m <= 180);
}
function xmlToElevation(node) {
    let str = node.textContent;
    let num = str.toLowerCase().indexOf("0x") === 0 ? parseInt(str, 16) : parseFloat(str);
    return num;
}
function xmlToMidiInstrument(node) {
    let ret = {
        midiUnpitched: null,
        volume: null,
        pan: null,
        elevation: null,
        midiBank: null,
        midiProgram: null,
        id: "",
        midiChannel: null,
        midiName: "",
    };
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "midi-unpitched") {
            let dataMidiUnpitched = getNumber(ch, true);
            ret.midiUnpitched = dataMidiUnpitched;
        }
        if (ch.nodeName === "volume") {
            let dataVolume = getNumber(ch, true);
            ret.volume = dataVolume;
        }
        if (ch.nodeName === "pan") {
            let dataPan = getNumber(ch, true);
            ret.pan = dataPan;
        }
        if (ch.nodeName === "elevation") {
            let dataElevation = getNumber(ch, true);
            ret.elevation = dataElevation;
        }
        if (ch.nodeName === "midi-bank") {
            let dataMidiBank = getNumber(ch, true);
            ret.midiBank = dataMidiBank;
        }
        if (ch.nodeName === "midi-program") {
            let dataMidiProgram = getNumber(ch, true);
            ret.midiProgram = dataMidiProgram;
        }
        if (ch.nodeName === "midi-channel") {
            let dataMidiChannel = getNumber(ch, true);
            ret.midiChannel = dataMidiChannel;
        }
        if (ch.nodeName === "midi-name") {
            let dataMidiName = getString(ch, true);
            ret.midiName = dataMidiName;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "id") {
            let dataId = getString(ch2, true);
            ret.id = dataId;
        }
    }
    return ret;
}
function xmlToPlay(node) {
    let ret = {
        ipa: "",
        mute: "",
        otherPlay: null,
        semiPitched: "",
        id: "",
    };
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "ipa") {
            let dataIpa = getString(ch, true);
            ret.ipa = dataIpa;
        }
        if (ch.nodeName === "mute") {
            let dataMute = getString(ch, true);
            ret.mute = dataMute;
        }
        if (ch.nodeName === "other-play") {
            let dataOtherPlay = xmlToOtherPlay(ch);
            ret.otherPlay = dataOtherPlay;
        }
        if (ch.nodeName === "semi-pitched") {
            let dataSemiPitched = getString(ch, true);
            ret.semiPitched = dataSemiPitched;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "id") {
            let dataId = getString(ch2, true);
            ret.id = dataId;
        }
    }
    return ret;
}
function xmlToOtherPlay(node) {
    let ret = {
        data: "",
        type: "",
    };
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "type") {
            let dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    return ret;
}
function xmlToScaling(node) {
    let ret = {
        tenths: null,
        millimeters: null,
    };
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "tenths") {
            let dataTenths = getNumber(ch, true);
            ret.tenths = dataTenths;
        }
        if (ch.nodeName === "millimeters") {
            let dataMillimeters = getNumber(ch, true);
            ret.millimeters = dataMillimeters;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
var OddEvenBoth;
(function (OddEvenBoth) {
    OddEvenBoth[OddEvenBoth["Both"] = 2] = "Both";
    OddEvenBoth[OddEvenBoth["Even"] = 1] = "Even";
    OddEvenBoth[OddEvenBoth["Odd"] = 0] = "Odd";
})(OddEvenBoth || (exports.OddEvenBoth = OddEvenBoth = {}));
function getOddEvenBoth(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "both") {
        return OddEvenBoth.Both;
    }
    if (s == "even") {
        return OddEvenBoth.Even;
    }
    if (s == "odd") {
        return OddEvenBoth.Odd;
    }
    return fallbackVal;
}
function xmlToPageMargins(node) {
    let ret = {};
    let foundType = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "top-margin") {
            let dataTopMargin = getNumber(ch, true);
            ret.topMargin = dataTopMargin;
        }
        if (ch.nodeName === "left-margin") {
            let dataLeftMargin = getNumber(ch, true);
            ret.leftMargin = dataLeftMargin;
        }
        if (ch.nodeName === "bottom-margin") {
            let dataBottomMargin = getNumber(ch, true);
            ret.bottomMargin = dataBottomMargin;
        }
        if (ch.nodeName === "right-margin") {
            let dataRightMargin = getNumber(ch, true);
            ret.rightMargin = dataRightMargin;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "type") {
            let dataType = getOddEvenBoth(ch2, OddEvenBoth.Both);
            ret.type = dataType;
            foundType = true;
        }
    }
    if (!foundType) {
        ret.type = OddEvenBoth.Both;
    }
    return ret;
}
function xmlToPageLayout(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "page-height") {
            let dataPageHeight = getNumber(ch, true);
            ret.pageHeight = dataPageHeight;
        }
        if (ch.nodeName === "page-width") {
            let dataPageWidth = getNumber(ch, true);
            ret.pageWidth = dataPageWidth;
        }
        if (ch.nodeName === "page-margins") {
            let dataPageMargins = xmlToPageMargins(ch);
            ret.pageMargins = (ret.pageMargins || []).concat(dataPageMargins);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToSystemLayout(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "system-dividers") {
            let dataSystemDividers = xmlToSystemDividers(ch);
            ret.systemDividers = dataSystemDividers;
        }
        if (ch.nodeName === "system-margins") {
            let dataSystemMargins = xmlToSystemMargins(ch);
            ret.systemMargins = dataSystemMargins;
        }
        if (ch.nodeName === "system-distance") {
            let dataSystemDistance = getNumber(ch, true);
            ret.systemDistance = dataSystemDistance;
        }
        if (ch.nodeName === "top-system-distance") {
            let dataTopSystemDistance = getNumber(ch, true);
            ret.topSystemDistance = dataTopSystemDistance;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToSystemMargins(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "left-margin") {
            let dataLeftMargin = getNumber(ch, true);
            ret.leftMargin = dataLeftMargin;
        }
        if (ch.nodeName === "right-margin") {
            let dataRightMargin = getNumber(ch, true);
            ret.rightMargin = dataRightMargin;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToSystemDividers(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "right-divider") {
            let dataRightDivider = xmlToRightDivider(ch);
            ret.rightDivider = dataRightDivider;
        }
        if (ch.nodeName === "left-divider") {
            let dataLeftDivider = xmlToLeftDivider(ch);
            ret.leftDivider = dataLeftDivider;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToLeftDivider(node) {
    let ret = {};
    let foundPrintObject = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToRightDivider(node) {
    let ret = {};
    let foundPrintObject = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToStaffLayout(node) {
    let ret = {};
    let foundNum = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "staff-distance") {
            let dataStaffDistance = getNumber(ch, true);
            ret.staffDistance = dataStaffDistance;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNum = getNumber(ch2, true);
            ret.number = dataNum;
            foundNum = true;
        }
    }
    if (!foundNum) {
        ret.number = 1;
    }
    return ret;
}
function xmlToMeasureLayout(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "measure-distance") {
            let dataMeasureDistance = getNumber(ch, true);
            ret.measureDistance = dataMeasureDistance;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToLineWidth(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "type") {
            let dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataTenths = getNumber(ch3, true);
    ret.tenths = dataTenths;
    return ret;
}
var CueGraceLarge;
(function (CueGraceLarge) {
    CueGraceLarge[CueGraceLarge["Grace"] = 1] = "Grace";
    CueGraceLarge[CueGraceLarge["Cue"] = 0] = "Cue";
    CueGraceLarge[CueGraceLarge["Large"] = 2] = "Large";
})(CueGraceLarge || (exports.CueGraceLarge = CueGraceLarge = {}));
function getCueGraceLarge(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "grace") {
        return CueGraceLarge.Grace;
    }
    if (s == "cue") {
        return CueGraceLarge.Cue;
    }
    if (s == "large") {
        return CueGraceLarge.Large;
    }
    return fallbackVal;
}
function xmlToNoteSize(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "type") {
            let dataType = getCueGraceLarge(ch2, null);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataSize = getNumber(ch3, true);
    ret.size = dataSize;
    return ret;
}
function xmlToDistance(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "type") {
            let dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataTenths = getNumber(ch3, true);
    ret.tenths = dataTenths;
    return ret;
}
function xmlToAppearance(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "line-width") {
            let dataLineWidths = xmlToLineWidth(ch);
            ret.lineWidths = ret.lineWidths || {};
            ret.lineWidths[popFront(toCamelCase((dataLineWidths.type.length ? "_" : "") + dataLineWidths.type))] = dataLineWidths;
        }
        if (ch.nodeName === "distance") {
            let dataDistances = xmlToDistance(ch);
            ret.distances = ret.distances || {};
            ret.distances[popFront(toCamelCase((dataDistances.type.length ? "_" : "") + dataDistances.type))] = dataDistances;
        }
        if (ch.nodeName === "other-appearance") {
            let dataOtherAppearances = getString(ch, true);
            ret.otherAppearances = (ret.otherAppearances || []).concat(dataOtherAppearances);
        }
        if (ch.nodeName === "note-size") {
            let dataNoteSizes = xmlToNoteSize(ch);
            ret.noteSizes = ret.noteSizes || {};
            ret.noteSizes[dataNoteSizes.type] = dataNoteSizes;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToCreator(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "type") {
            let dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataCreator = getString(ch3, true);
    ret.creator = dataCreator;
    return ret;
}
function xmlToRights(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "type") {
            let dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataRights = getString(ch3, true);
    ret.rights = dataRights;
    return ret;
}
function xmlToEncoder(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "type") {
            let dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataEncoder = getString(ch3, true);
    ret.encoder = dataEncoder;
    return ret;
}
function xmlToRelation(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "type") {
            let dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    return ret;
}
function xmlToMiscellaneousField(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "name") {
            let dataName = getString(ch2, true);
            ret.name = dataName;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    return ret;
}
function xmlToMiscellaneous(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "miscellaneous-field") {
            let dataMiscellaneousFields = xmlToMiscellaneousField(ch);
            ret.miscellaneousFields = (ret.miscellaneousFields || []).concat(dataMiscellaneousFields);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToIdentification(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "miscellaneous") {
            let dataMiscellaneous = xmlToMiscellaneous(ch);
            ret.miscellaneous = dataMiscellaneous;
        }
        if (ch.nodeName === "creator") {
            let dataCreators = xmlToCreator(ch);
            ret.creators = (ret.creators || []).concat(dataCreators);
        }
        if (ch.nodeName === "relation") {
            let dataRelations = xmlToRelation(ch);
            ret.relations = (ret.relations || []).concat(dataRelations);
        }
        if (ch.nodeName === "rights") {
            let dataRights = xmlToRights(ch);
            ret.rights = (ret.rights || []).concat(dataRights);
        }
        if (ch.nodeName === "encoding") {
            let dataEncoding = xmlToEncoding(ch);
            ret.encoding = dataEncoding;
        }
        if (ch.nodeName === "source") {
            let dataSource = getString(ch, true);
            ret.source = dataSource;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToSupports(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "element") {
            let dataElement = getString(ch2, true);
            ret.element = dataElement;
        }
        if (ch2.name === "attribute") {
            let dataAttribute = getString(ch2, true);
            ret.attribute = dataAttribute;
        }
        if (ch2.name === "value") {
            let dataValue = getString(ch2, true);
            ret.value = dataValue;
        }
        if (ch2.name === "type") {
            let dataType = xmlToYesNo(ch2);
            ret.type = dataType;
        }
    }
    ret.element = ret.element || "";
    ret.attribute = ret.attribute || "";
    ret.value = ret.value || "";
    ret.type = defined(ret.type) ? ret.type : true;
    return ret;
}
function xmlToEncoding(node) {
    let ret = {
        encodingDescriptions: [],
        encodingDate: null,
        supports: {},
        encoders: [],
        softwares: [],
    };
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "encoding-description") {
            let dataEncodingDescriptions = getString(ch, true);
            ret.encodingDescriptions = (ret.encodingDescriptions || []).concat(dataEncodingDescriptions);
        }
        if (ch.nodeName === "encoding-date") {
            let dataEncodingDate = xmlToEncodingDate(ch);
            ret.encodingDate = dataEncodingDate;
        }
        if (ch.nodeName === "supports") {
            let dataSupports = xmlToSupports(ch);
            ret.supports = ret.supports || {};
            ret.supports[popFront(toCamelCase((dataSupports.element.length ? "_" : "") + dataSupports.element) +
                (dataSupports.attribute.length ? "_" : "") +
                toCamelCase(dataSupports.attribute))] = dataSupports;
        }
        if (ch.nodeName === "encoder") {
            let dataEncoders = xmlToEncoder(ch);
            ret.encoders = (ret.encoders || []).concat(dataEncoders);
        }
        if (ch.nodeName === "software") {
            let dataSoftwares = getString(ch, true);
            ret.softwares = (ret.softwares || []).concat(dataSoftwares);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
var SeparatorType;
(function (SeparatorType) {
    SeparatorType[SeparatorType["None"] = 0] = "None";
    SeparatorType[SeparatorType["Horizontal"] = 1] = "Horizontal";
    SeparatorType[SeparatorType["Diagonal"] = 2] = "Diagonal";
    SeparatorType[SeparatorType["Vertical"] = 3] = "Vertical";
    SeparatorType[SeparatorType["Adjacent"] = 4] = "Adjacent";
})(SeparatorType || (exports.SeparatorType = SeparatorType = {}));
function getSeparatorType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return SeparatorType.None;
    }
    if (s == "horizontal") {
        return SeparatorType.Horizontal;
    }
    if (s == "diagonal") {
        return SeparatorType.Diagonal;
    }
    if (s == "vertical") {
        return SeparatorType.Vertical;
    }
    if (s == "adjacent") {
        return SeparatorType.Adjacent;
    }
    return fallbackVal;
}
function xmlToTimeSeparator(node) {
    let ret = {};
    let foundSeparator = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "separator") {
            let dataSeparator = getSeparatorType(ch2, SeparatorType.None);
            ret.separator = dataSeparator;
            foundSeparator = true;
        }
    }
    if (!foundSeparator) {
        ret.separator = SeparatorType.None;
    }
    return ret;
}
var TimeSymbolType;
(function (TimeSymbolType) {
    TimeSymbolType[TimeSymbolType["DottedNote"] = 4] = "DottedNote";
    TimeSymbolType[TimeSymbolType["Cut"] = 1] = "Cut";
    TimeSymbolType[TimeSymbolType["SingleNumber"] = 2] = "SingleNumber";
    TimeSymbolType[TimeSymbolType["Note"] = 3] = "Note";
    TimeSymbolType[TimeSymbolType["Common"] = 0] = "Common";
    TimeSymbolType[TimeSymbolType["Normal"] = 5] = "Normal";
})(TimeSymbolType || (exports.TimeSymbolType = TimeSymbolType = {}));
function getTimeSymbolType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "dotted-note") {
        return TimeSymbolType.DottedNote;
    }
    if (s == "cut") {
        return TimeSymbolType.Cut;
    }
    if (s == "single-number") {
        return TimeSymbolType.SingleNumber;
    }
    if (s == "note") {
        return TimeSymbolType.Note;
    }
    if (s == "common") {
        return TimeSymbolType.Common;
    }
    if (s == "normal") {
        return TimeSymbolType.Normal;
    }
    return fallbackVal;
}
function xmlToTimeSymbol(node) {
    let ret = {};
    let foundSymbol = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "symbol") {
            let dataSymbol = getTimeSymbolType(ch2, TimeSymbolType.Normal);
            ret.symbol = dataSymbol;
            foundSymbol = true;
        }
    }
    if (!foundSymbol) {
        ret.symbol = TimeSymbolType.Normal;
    }
    return ret;
}
var CancelLocation;
(function (CancelLocation) {
    CancelLocation[CancelLocation["Right"] = 1] = "Right";
    CancelLocation[CancelLocation["BeforeBarline"] = 2] = "BeforeBarline";
    CancelLocation[CancelLocation["Left"] = 0] = "Left";
})(CancelLocation || (exports.CancelLocation = CancelLocation = {}));
function getCancelLocation(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return CancelLocation.Right;
    }
    if (s == "before-barline") {
        return CancelLocation.BeforeBarline;
    }
    if (s == "left") {
        return CancelLocation.Left;
    }
    return fallbackVal;
}
function xmlToCancel(node) {
    let ret = {};
    let foundLocation = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "location") {
            let dataLocation = getCancelLocation(ch2, CancelLocation.Left);
            ret.location = dataLocation;
            foundLocation = true;
        }
    }
    let ch3 = node;
    let dataFifths = getNumber(ch3, true);
    ret.fifths = dataFifths;
    if (!foundLocation) {
        ret.location = CancelLocation.Left;
    }
    return ret;
}
function xmlToKeyOctave(node) {
    let ret = {};
    let foundCancel = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "cancel") {
            let dataCancel = xmlToYesNo(ch2);
            ret.cancel = dataCancel;
            foundCancel = true;
        }
    }
    let ch3 = node;
    let dataOctave = getNumber(ch3, true);
    ret.octave = dataOctave;
    if (!foundCancel) {
        ret.cancel = false;
    }
    return ret;
}
function xmlToKey(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPrintObject = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "cancel") {
            let dataCancel = xmlToCancel(ch);
            ret.cancel = dataCancel;
        }
        if (ch.nodeName === "key-step") {
            let dataKeySteps = getString(ch, true);
            ret.keySteps = (ret.keySteps || []).concat(dataKeySteps);
        }
        if (ch.nodeName === "key-octave") {
            let dataKeyOctaves = xmlToKeyOctave(ch);
            ret.keyOctaves = (ret.keyOctaves || []).concat(dataKeyOctaves);
        }
        if (ch.nodeName === "fifths") {
            let dataFifths = getNumber(ch, true);
            ret.fifths = dataFifths;
        }
        if (ch.nodeName === "key-alter") {
            let dataKeyAlters = getString(ch, true);
            ret.keyAlters = (ret.keyAlters || []).concat(dataKeyAlters);
        }
        if (ch.nodeName === "key-accidental") {
            let dataKeyAccidentals = getString(ch, true);
            ret.keyAccidentals = ret.keyAccidentals || [];
            ret.keyAccidentals.length = Math.max(ret.keyAccidentals.length, ret.keySteps.length);
            ret.keyAccidentals[ret.keySteps.length - 1] = dataKeyAccidentals;
        }
        if (ch.nodeName === "mode") {
            let dataMode = getString(ch, true);
            ret.mode = dataMode;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!ret.keyAccidentals) {
        ret.keyAccidentals = [];
    }
    ret._class = "Key";
    return ret;
}
function xmlToTime(node) {
    let ret = {};
    let foundSymbol = false;
    let foundSeparator = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    let foundPrintObject = false;
    let foundNumber = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "interchangeable") {
            let dataInterchangeable = xmlToInterchangeable(ch);
            ret.interchangeable = dataInterchangeable;
        }
        if (ch.nodeName === "beats") {
            let dataBeats = getString(ch, true);
            ret.beats = (ret.beats || []).concat(dataBeats);
        }
        if (ch.nodeName === "beat-type") {
            let dataBeatTypes = getNumber(ch, true);
            ret.beatTypes = (ret.beatTypes || []).concat(dataBeatTypes);
        }
        if (ch.nodeName === "senza-misura") {
            let dataSenzaMisura = getString(ch, true);
            ret.senzaMisura = dataSenzaMisura;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "symbol") {
            let dataSymbol = getTimeSymbolType(ch2, TimeSymbolType.Normal);
            ret.symbol = dataSymbol;
            foundSymbol = true;
        }
        if (ch2.name === "separator") {
            let dataSeparator = getSeparatorType(ch2, SeparatorType.None);
            ret.separator = dataSeparator;
            foundSeparator = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber = true;
        }
    }
    if (!foundSymbol) {
        ret.symbol = TimeSymbolType.Normal;
    }
    if (!foundSeparator) {
        ret.separator = SeparatorType.None;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundNumber) {
        ret.number = 1;
    }
    ret._class = "Time";
    return ret;
}
function xmlToInterchangeable(node) {
    let ret = {};
    let foundSymbol = false;
    let foundSeparator = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "beats") {
            let dataBeats = getString(ch, true);
            ret.beats = (ret.beats || []).concat(dataBeats);
        }
        if (ch.nodeName === "beat-type") {
            let dataBeatTypes = getNumber(ch, true);
            ret.beatTypes = (ret.beatTypes || []).concat(dataBeatTypes);
        }
        if (ch.nodeName === "time-relation") {
            let dataTimeRelation = getString(ch, true);
            ret.timeRelation = dataTimeRelation;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "symbol") {
            let dataSymbol = getTimeSymbolType(ch2, TimeSymbolType.Normal);
            ret.symbol = dataSymbol;
            foundSymbol = true;
        }
        if (ch2.name === "separator") {
            let dataSeparator = getSeparatorType(ch2, SeparatorType.None);
            ret.separator = dataSeparator;
            foundSeparator = true;
        }
    }
    if (!foundSymbol) {
        ret.symbol = TimeSymbolType.Normal;
    }
    if (!foundSeparator) {
        ret.separator = SeparatorType.None;
    }
    return ret;
}
var PartSymbolType;
(function (PartSymbolType) {
    PartSymbolType[PartSymbolType["None"] = 0] = "None";
    PartSymbolType[PartSymbolType["Line"] = 2] = "Line";
    PartSymbolType[PartSymbolType["Bracket"] = 3] = "Bracket";
    PartSymbolType[PartSymbolType["Square"] = 4] = "Square";
    PartSymbolType[PartSymbolType["Brace"] = 1] = "Brace";
})(PartSymbolType || (exports.PartSymbolType = PartSymbolType = {}));
function getPartSymbolType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return PartSymbolType.None;
    }
    if (s == "line") {
        return PartSymbolType.Line;
    }
    if (s == "bracket") {
        return PartSymbolType.Bracket;
    }
    if (s == "square") {
        return PartSymbolType.Square;
    }
    if (s == "brace") {
        return PartSymbolType.Brace;
    }
    return fallbackVal;
}
function xmlToPartSymbol(node) {
    let ret = {};
    let foundTopStaff = false;
    let foundColor = false;
    let foundBottomStaff = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "top-staff") {
            let dataTopStaff = getNumber(ch2, true);
            ret.topStaff = dataTopStaff;
            foundTopStaff = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "bottom-staff") {
            let dataBottomStaff = getNumber(ch2, true);
            ret.bottomStaff = dataBottomStaff;
            foundBottomStaff = true;
        }
    }
    let ch3 = node;
    let dataType = getPartSymbolType(ch3, null);
    ret.type = dataType;
    if (!foundTopStaff) {
        ret.topStaff = -1;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundBottomStaff) {
        ret.bottomStaff = -1;
    }
    ret._class = "PartSymbol";
    return ret;
}
function xmlToClef(node) {
    let ret = {};
    let foundNumber_ = false;
    let foundSize = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPrintObject = false;
    let foundAfterBarline = false;
    let foundAdditional = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "clef-octave-change") {
            let dataClefOctaveChange = getString(ch, true);
            ret.clefOctaveChange = dataClefOctaveChange;
        }
        if (ch.nodeName === "sign") {
            let dataSign = getString(ch, true);
            ret.sign = dataSign;
        }
        if (ch.nodeName === "line") {
            let dataLine = getNumber(ch, true);
            ret.line = dataLine;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "size") {
            let dataSize = getSymbolSize(ch2, SymbolSize.Full);
            ret.size = dataSize;
            foundSize = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "after-barline") {
            let dataAfterBarline = xmlToYesNo(ch2);
            ret.afterBarline = dataAfterBarline;
            foundAfterBarline = true;
        }
        if (ch2.name === "additional") {
            let dataAdditional = xmlToYesNo(ch2);
            ret.additional = dataAdditional;
            foundAdditional = true;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundSize) {
        ret.size = SymbolSize.Full;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundAfterBarline) {
        ret.afterBarline = false;
    }
    if (!foundAdditional) {
        ret.additional = false;
    }
    return ret;
}
function xmlToStaffTuning(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "tuning-alter") {
            let dataTuningAlter = getString(ch, true);
            ret.tuningAlter = dataTuningAlter;
        }
        if (ch.nodeName === "tuning-step") {
            let dataTuningStep = getString(ch, true);
            ret.tuningStep = dataTuningStep;
        }
        if (ch.nodeName === "tuning-octave") {
            let dataTuningOctave = getString(ch, true);
            ret.tuningOctave = dataTuningOctave;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "line") {
            let dataLine = getString(ch2, true);
            ret.line = dataLine;
        }
    }
    return ret;
}
var ShowFretsType;
(function (ShowFretsType) {
    ShowFretsType[ShowFretsType["Letters"] = 1] = "Letters";
    ShowFretsType[ShowFretsType["Numbers"] = 0] = "Numbers";
})(ShowFretsType || (exports.ShowFretsType = ShowFretsType = {}));
function getShowFretsType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "letters") {
        return ShowFretsType.Letters;
    }
    if (s == "numbers") {
        return ShowFretsType.Numbers;
    }
    return fallbackVal;
}
function xmlToStaffDetails(node) {
    let ret = {};
    let foundShowFrets = false;
    let foundNumber_ = false;
    let foundPrintObject = false;
    let foundPrintSpacing = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "staff-lines") {
            let dataStaffLines = getNumber(ch, true);
            ret.staffLines = dataStaffLines;
        }
        if (ch.nodeName === "staff-tuning") {
            let dataStaffTunings = xmlToStaffTuning(ch);
            ret.staffTunings = (ret.staffTunings || []).concat(dataStaffTunings);
        }
        if (ch.nodeName === "staff-size") {
            let dataStaffSize = getNumber(ch, true);
            ret.staffSize = dataStaffSize;
        }
        if (ch.nodeName === "capo") {
            let dataCapo = getString(ch, true);
            ret.capo = dataCapo;
        }
        if (ch.nodeName === "staff-type") {
            let dataStaffType = getString(ch, true);
            ret.staffType = dataStaffType;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "show-frets") {
            let dataShowFrets = getShowFretsType(ch2, ShowFretsType.Numbers);
            ret.showFrets = dataShowFrets;
            foundShowFrets = true;
        }
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "print-spacing") {
            let dataPrintSpacing = xmlToYesNo(ch2);
            ret.printSpacing = dataPrintSpacing;
            foundPrintSpacing = true;
        }
    }
    if (!foundShowFrets) {
        ret.showFrets = ShowFretsType.Numbers;
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundPrintSpacing) {
        ret.printSpacing = true;
    }
    return ret;
}
function xmlToDouble(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToTranspose(node) {
    let ret = {};
    let foundNumber_ = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "diatonic") {
            let dataDiatonic = getString(ch, true);
            ret.diatonic = dataDiatonic;
        }
        if (ch.nodeName === "octave-change") {
            let dataOctaveChange = getString(ch, true);
            ret.octaveChange = dataOctaveChange;
        }
        if (ch.nodeName === "double") {
            let dataDouble = xmlToDouble(ch);
            ret.double = dataDouble;
        }
        if (ch.nodeName === "chromatic") {
            let dataChromatic = getString(ch, true);
            ret.chromatic = dataChromatic;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
    }
    if (!foundNumber_) {
        ret.number = NaN;
    }
    return ret;
}
function xmlToDirective(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToSlashDot(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToMultipleRest(node) {
    let ret = {};
    let foundUseSymbols = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "use-symbols") {
            let dataUseSymbols = xmlToYesNo(ch2);
            ret.useSymbols = dataUseSymbols;
            foundUseSymbols = true;
        }
    }
    let ch3 = node;
    let dataCount = getNumber(ch3, true);
    ret.count = dataCount;
    if (!foundUseSymbols) {
        ret.useSymbols = false;
    }
    return ret;
}
function xmlToMeasureRepeat(node) {
    let ret = {};
    let foundSlashes = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "type") {
            let dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "slashes") {
            let dataSlashes = getNumber(ch2, true);
            ret.slashes = dataSlashes;
            foundSlashes = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundSlashes) {
        ret.slashes = 1;
    }
    return ret;
}
function xmlToBeatRepeat(node) {
    let ret = {};
    let foundUseDots = false;
    let foundSlases = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "slash-type") {
            let dataSlashType = getString(ch, true);
            ret.slashType = dataSlashType;
        }
        if (ch.nodeName === "slash-dot") {
            let dataSlashDots = xmlToSlashDot(ch);
            ret.slashDots = (ret.slashDots || []).concat(dataSlashDots);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "use-dots") {
            let dataUseDots = xmlToYesNo(ch2);
            ret.useDots = dataUseDots;
            foundUseDots = true;
        }
        if (ch2.name === "slases") {
            let dataSlases = getNumber(ch2, true);
            ret.slases = dataSlases;
            foundSlases = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundUseDots) {
        ret.useDots = false;
    }
    if (!foundSlases) {
        ret.slases = 1;
    }
    return ret;
}
function xmlToSlash(node) {
    let ret = {};
    let foundUseDots = false;
    let foundUseStems = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "slash-type") {
            let dataSlashType = getString(ch, true);
            ret.slashType = dataSlashType;
        }
        if (ch.nodeName === "slash-dot") {
            let dataSlashDots = xmlToSlashDot(ch);
            ret.slashDots = (ret.slashDots || []).concat(dataSlashDots);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "use-dots") {
            let dataUseDots = xmlToYesNo(ch2);
            ret.useDots = dataUseDots;
            foundUseDots = true;
        }
        if (ch2.name === "use-stems") {
            let dataUseStems = xmlToYesNo(ch2);
            ret.useStems = dataUseStems;
            foundUseStems = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundUseDots) {
        ret.useDots = false;
    }
    if (!foundUseStems) {
        ret.useStems = false;
    }
    return ret;
}
function xmlToMeasureStyle(node) {
    let ret = {};
    let foundNumber_ = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "measure-repeat") {
            let dataMeasureRepeat = xmlToMeasureRepeat(ch);
            ret.measureRepeat = dataMeasureRepeat;
        }
        if (ch.nodeName === "beat-repeat") {
            let dataBeatRepeat = xmlToBeatRepeat(ch);
            ret.beatRepeat = dataBeatRepeat;
        }
        if (ch.nodeName === "multiple-rest") {
            let dataMultipleRest = xmlToMultipleRest(ch);
            ret.multipleRest = dataMultipleRest;
        }
        if (ch.nodeName === "slash") {
            let dataSlash = xmlToSlash(ch);
            ret.slash = dataSlash;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToAttributes(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "divisions") {
            let dataDivisions = getNumber(ch, true);
            ret.divisions = dataDivisions;
        }
        if (ch.nodeName === "part-symbol") {
            let dataPartSymbol = xmlToPartSymbol(ch);
            ret.partSymbol = dataPartSymbol;
        }
        if (ch.nodeName === "clef") {
            let dataClefs = xmlToClef(ch);
            ret.clefs = (ret.clefs || []).concat(dataClefs);
        }
        if (ch.nodeName === "measure-style") {
            let dataMeasureStyle = xmlToMeasureStyle(ch);
            ret.measureStyles = (ret.measureStyles || []).concat(dataMeasureStyle);
        }
        if (ch.nodeName === "time") {
            let dataTimes = xmlToTime(ch);
            ret.times = (ret.times || []).concat(dataTimes);
        }
        if (ch.nodeName === "staff-details") {
            let dataStaffDetails = xmlToStaffDetails(ch);
            ret.staffDetails = (ret.staffDetails || []).concat(dataStaffDetails);
        }
        if (ch.nodeName === "transpose") {
            let dataTransposes = xmlToTranspose(ch);
            ret.transposes = (ret.transposes || []).concat(dataTransposes);
        }
        if (ch.nodeName === "footnote") {
            let dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            let dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "staves") {
            let dataStaves = getNumber(ch, true);
            ret.staves = dataStaves;
        }
        if (ch.nodeName === "instruments") {
            let dataInstruments = getString(ch, true);
            ret.instruments = dataInstruments;
        }
        if (ch.nodeName === "key") {
            let dataKeySignatures = xmlToKey(ch);
            ret.keySignatures = (ret.keySignatures || []).concat(dataKeySignatures);
        }
        if (ch.nodeName === "directive") {
            let dataDirectives = xmlToDirective(ch);
            ret.directives = (ret.directives || []).concat(dataDirectives);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    ret._class = "Attributes";
    return ret;
}
function xmlToCue(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToGrace(node) {
    let ret = {};
    let foundSlash = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "make-time") {
            let dataMakeTime = getString(ch2, true);
            ret.makeTime = dataMakeTime;
        }
        if (ch2.name === "steal-time-previous") {
            let dataStealTimePrevious = getString(ch2, true);
            ret.stealTimePrevious = dataStealTimePrevious;
        }
        if (ch2.name === "slash") {
            let dataSlash = xmlToYesNo(ch2);
            ret.slash = dataSlash;
            foundSlash = true;
        }
        if (ch2.name === "steal-time-following") {
            let dataStealTimeFollowing = getString(ch2, true);
            ret.stealTimeFollowing = dataStealTimeFollowing;
        }
    }
    if (!foundSlash) {
        ret.slash = false;
    }
    return ret;
}
function xmlToChord(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToUnpitched(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "display-step") {
            let dataDisplayStep = getString(ch, true);
            ret.displayStep = dataDisplayStep;
        }
        if (ch.nodeName === "display-octave") {
            let dataDisplayOctave = getNumber(ch, true);
            ret.displayOctave = dataDisplayOctave;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToPitch(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "alter") {
            let dataAlter = getNumber(ch, true);
            ret.alter = dataAlter;
        }
        if (ch.nodeName === "step") {
            let dataStep = getString(ch, true);
            ret.step = dataStep.toLowerCase();
        }
        if (ch.nodeName === "octave") {
            let dataOctave = getNumber(ch, true);
            ret.octave = dataOctave;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToFullNote(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "unpitched") {
            let dataUnpitched = xmlToUnpitched(ch);
            ret.unpitched = dataUnpitched;
        }
        if (ch.nodeName === "chord") {
            let dataChord = xmlToChord(ch);
            ret.chord = dataChord;
        }
        if (ch.nodeName === "pitch") {
            let dataPitch = xmlToPitch(ch);
            ret.pitch = dataPitch;
        }
        if (ch.nodeName === "rest") {
            let dataRest = xmlToRest(ch);
            ret.rest = dataRest;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToRest(node) {
    let ret = {};
    let foundMeasure = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "display-step") {
            let dataDisplayStep = getString(ch, true);
            ret.displayStep = dataDisplayStep;
        }
        if (ch.nodeName === "display-octave") {
            let dataDisplayOctave = getNumber(ch, true);
            ret.displayOctave = dataDisplayOctave;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "measure") {
            let dataMeasure = xmlToYesNo(ch2);
            ret.measure = dataMeasure;
            foundMeasure = true;
        }
    }
    if (!foundMeasure) {
        ret.measure = false;
    }
    return ret;
}
function xmlToTie(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "time-only") {
            let dataTimeOnly = getString(ch2, true);
            ret.timeOnly = dataTimeOnly;
        }
        if (ch2.name === "type") {
            let dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    return ret;
}
function xmlToInstrument(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "id") {
            let dataId = getString(ch2, true);
            ret.id = dataId;
        }
    }
    return ret;
}
function xmlToNote(node) {
    let ret = {};
    let foundAttack = false;
    let foundEndDynamics = false;
    let foundPizzicato = false;
    let foundDynamics = false;
    let foundRelease = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPrintObject = false;
    let foundPrintSpacing = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "notehead-text") {
            let dataNoteheadText = xmlToNoteheadText(ch);
            ret.noteheadText = dataNoteheadText;
        }
        if (ch.nodeName === "time-modification") {
            let dataTimeModification = xmlToTimeModification(ch);
            ret.timeModification = dataTimeModification;
        }
        if (ch.nodeName === "accidental") {
            let dataAccidental = xmlToAccidental(ch);
            ret.accidental = dataAccidental;
        }
        if (ch.nodeName === "instrument") {
            let dataInstrument = xmlToInstrument(ch);
            ret.instrument = dataInstrument;
        }
        if (ch.nodeName === "lyric") {
            let dataLyrics = xmlToLyric(ch);
            ret.lyrics = (ret.lyrics || []).concat(dataLyrics);
        }
        if (ch.nodeName === "dot") {
            let dataDots = xmlToDot(ch);
            ret.dots = (ret.dots || []).concat(dataDots);
        }
        if (ch.nodeName === "notations") {
            let dataNotations = xmlToNotations(ch);
            ret.notations = (ret.notations || []).concat(dataNotations);
        }
        if (ch.nodeName === "stem") {
            let dataStem = xmlToStem(ch);
            ret.stem = dataStem;
        }
        if (ch.nodeName === "type") {
            let dataNoteType = xmlToType(ch);
            ret.noteType = dataNoteType;
        }
        if (ch.nodeName === "cue") {
            let dataCue = xmlToCue(ch);
            ret.cue = dataCue;
        }
        if (ch.nodeName === "duration") {
            let dataDuration = getNumber(ch, true);
            ret.duration = dataDuration;
        }
        if (ch.nodeName === "tie") {
            let dataTies = xmlToTie(ch);
            ret.ties = (ret.ties || []).concat(dataTies);
        }
        if (ch.nodeName === "play") {
            let dataPlay = xmlToPlay(ch);
            ret.play = dataPlay;
        }
        if (ch.nodeName === "staff") {
            let dataStaff = getNumber(ch, true);
            ret.staff = dataStaff;
        }
        if (ch.nodeName === "grace") {
            let dataGrace = xmlToGrace(ch);
            ret.grace = dataGrace;
        }
        if (ch.nodeName === "notehead") {
            let dataNotehead = xmlToNotehead(ch);
            ret.notehead = dataNotehead;
        }
        if (ch.nodeName === "voice") {
            let dataVoice = getNumber(ch, true);
            ret.voice = dataVoice;
        }
        if (ch.nodeName === "footnote") {
            let dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            let dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "unpitched") {
            let dataUnpitched = xmlToUnpitched(ch);
            ret.unpitched = dataUnpitched;
        }
        if (ch.nodeName === "chord") {
            let dataChord = xmlToChord(ch);
            ret.chord = dataChord;
        }
        if (ch.nodeName === "pitch") {
            let dataPitch = xmlToPitch(ch);
            ret.pitch = dataPitch;
        }
        if (ch.nodeName === "rest") {
            let dataRest = xmlToRest(ch);
            ret.rest = dataRest;
        }
        if (ch.nodeName === "beam") {
            let dataBeams = xmlToBeam(ch);
            ret.beams = (ret.beams || []).concat(dataBeams);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "attack") {
            let dataAttack = getNumber(ch2, true);
            ret.attack = dataAttack;
            foundAttack = true;
        }
        if (ch2.name === "end-dynamics") {
            let dataEndDynamics = getNumber(ch2, true);
            ret.endDynamics = dataEndDynamics;
            foundEndDynamics = true;
        }
        if (ch2.name === "pizzicato") {
            let dataPizzicato = xmlToYesNo(ch2);
            ret.pizzicato = dataPizzicato;
            foundPizzicato = true;
        }
        if (ch2.name === "dynamics") {
            let dataDynamics = getNumber(ch2, true);
            ret.dynamics = dataDynamics;
            foundDynamics = true;
        }
        if (ch2.name === "release") {
            let dataRelease = getNumber(ch2, true);
            ret.release = dataRelease;
            foundRelease = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-dot") {
            let dataPrintDot = xmlToYesNo(ch2);
            ret.printDot = dataPrintDot;
        }
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "print-spacing") {
            let dataPrintSpacing = xmlToYesNo(ch2);
            ret.printSpacing = dataPrintSpacing;
            foundPrintSpacing = true;
        }
        if (ch2.name === "print-lyric") {
            let dataPrintLyric = xmlToYesNo(ch2);
            ret.printLyric = dataPrintLyric;
        }
        if (ch2.name === "time-only") {
            let dataTimeOnly = getString(ch2, true);
            ret.timeOnly = dataTimeOnly;
        }
    }
    if (!foundAttack) {
        ret.attack = NaN;
    }
    if (!foundEndDynamics) {
        ret.endDynamics = 90;
    }
    if (!foundPizzicato) {
        ret.pizzicato = false;
    }
    if (!foundDynamics) {
        ret.dynamics = 90;
    }
    if (!foundRelease) {
        ret.release = NaN;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundPrintSpacing) {
        ret.printSpacing = true;
    }
    ret._class = "Note";
    return ret;
}
var Count;
(function (Count) {
    Count[Count["Quarter"] = 4] = "Quarter";
    Count[Count["Breve"] = 9990] = "Breve";
    Count[Count["Long"] = 9991] = "Long";
    Count[Count["_1024th"] = 1024] = "_1024th";
    Count[Count["_32nd"] = 32] = "_32nd";
    Count[Count["_16th"] = 16] = "_16th";
    Count[Count["Eighth"] = 8] = "Eighth";
    Count[Count["Maxima"] = 9992] = "Maxima";
    Count[Count["_512th"] = 512] = "_512th";
    Count[Count["_64th"] = 64] = "_64th";
    Count[Count["_256th"] = 256] = "_256th";
    Count[Count["_128th"] = 128] = "_128th";
    Count[Count["Half"] = 2] = "Half";
    Count[Count["Whole"] = 1] = "Whole";
})(Count || (exports.Count = Count = {}));
function getCount(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "quarter") {
        return Count.Quarter;
    }
    if (s == "breve") {
        return Count.Breve;
    }
    if (s == "long") {
        return Count.Long;
    }
    if (s == "1024th") {
        return Count._1024th;
    }
    if (s == "32nd") {
        return Count._32nd;
    }
    if (s == "16th") {
        return Count._16th;
    }
    if (s == "eighth") {
        return Count.Eighth;
    }
    if (s == "maxima") {
        return Count.Maxima;
    }
    if (s == "512th") {
        return Count._512th;
    }
    if (s == "64th") {
        return Count._64th;
    }
    if (s == "256th") {
        return Count._256th;
    }
    if (s == "128th") {
        return Count._128th;
    }
    if (s == "half") {
        return Count.Half;
    }
    if (s == "whole") {
        return Count.Whole;
    }
    return fallbackVal;
}
function xmlToType(node) {
    let ret = {};
    let foundSize = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "size") {
            let dataSize = getSymbolSize(ch2, SymbolSize.Unspecified);
            ret.size = dataSize;
            foundSize = true;
        }
    }
    let ch3 = node;
    let dataDuration = getCount(ch3, null);
    ret.duration = dataDuration;
    if (!foundSize) {
        ret.size = SymbolSize.Unspecified;
    }
    return ret;
}
function xmlToDot(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
var MxmlAccidental;
(function (MxmlAccidental) {
    MxmlAccidental[MxmlAccidental["NaturalFlat"] = 7] = "NaturalFlat";
    MxmlAccidental[MxmlAccidental["SharpUp"] = 13] = "SharpUp";
    MxmlAccidental[MxmlAccidental["ThreeQuartersFlat"] = 10] = "ThreeQuartersFlat";
    MxmlAccidental[MxmlAccidental["ThreeQuartersSharp"] = 11] = "ThreeQuartersSharp";
    MxmlAccidental[MxmlAccidental["QuarterFlat"] = 8] = "QuarterFlat";
    MxmlAccidental[MxmlAccidental["Flat"] = 2] = "Flat";
    MxmlAccidental[MxmlAccidental["TripleSharp"] = 18] = "TripleSharp";
    MxmlAccidental[MxmlAccidental["Flat1"] = 27] = "Flat1";
    MxmlAccidental[MxmlAccidental["Flat2"] = 28] = "Flat2";
    MxmlAccidental[MxmlAccidental["Flat3"] = 29] = "Flat3";
    MxmlAccidental[MxmlAccidental["Flat4"] = 291] = "Flat4";
    MxmlAccidental[MxmlAccidental["TripleFlat"] = 191] = "TripleFlat";
    MxmlAccidental[MxmlAccidental["Flat5"] = 30] = "Flat5";
    MxmlAccidental[MxmlAccidental["Sharp"] = 0] = "Sharp";
    MxmlAccidental[MxmlAccidental["QuarterSharp"] = 9] = "QuarterSharp";
    MxmlAccidental[MxmlAccidental["SlashFlat"] = 21] = "SlashFlat";
    MxmlAccidental[MxmlAccidental["FlatDown"] = 16] = "FlatDown";
    MxmlAccidental[MxmlAccidental["NaturalDown"] = 14] = "NaturalDown";
    MxmlAccidental[MxmlAccidental["SlashQuarterSharp"] = 19] = "SlashQuarterSharp";
    MxmlAccidental[MxmlAccidental["SharpSharp"] = 4] = "SharpSharp";
    MxmlAccidental[MxmlAccidental["Sharp1"] = 23] = "Sharp1";
    MxmlAccidental[MxmlAccidental["FlatUp"] = 17] = "FlatUp";
    MxmlAccidental[MxmlAccidental["Sharp2"] = 24] = "Sharp2";
    MxmlAccidental[MxmlAccidental["Sharp3"] = 25] = "Sharp3";
    MxmlAccidental[MxmlAccidental["DoubleSharp"] = 3] = "DoubleSharp";
    MxmlAccidental[MxmlAccidental["Sharp4"] = 251] = "Sharp4";
    MxmlAccidental[MxmlAccidental["Sharp5"] = 26] = "Sharp5";
    MxmlAccidental[MxmlAccidental["Sori"] = 31] = "Sori";
    MxmlAccidental[MxmlAccidental["DoubleSlashFlat"] = 22] = "DoubleSlashFlat";
    MxmlAccidental[MxmlAccidental["SharpDown"] = 12] = "SharpDown";
    MxmlAccidental[MxmlAccidental["Koron"] = 32] = "Koron";
    MxmlAccidental[MxmlAccidental["NaturalUp"] = 15] = "NaturalUp";
    MxmlAccidental[MxmlAccidental["SlashSharp"] = 20] = "SlashSharp";
    MxmlAccidental[MxmlAccidental["NaturalSharp"] = 6] = "NaturalSharp";
    MxmlAccidental[MxmlAccidental["FlatFlat"] = 5] = "FlatFlat";
    MxmlAccidental[MxmlAccidental["Natural"] = 1] = "Natural";
    MxmlAccidental[MxmlAccidental["DoubleFlat"] = 33] = "DoubleFlat";
})(MxmlAccidental || (exports.MxmlAccidental = MxmlAccidental = {}));
function getMxmlAccidental(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "natural-flat") {
        return MxmlAccidental.NaturalFlat;
    }
    if (s == "sharp-up") {
        return MxmlAccidental.SharpUp;
    }
    if (s == "three-quarters-flat") {
        return MxmlAccidental.ThreeQuartersFlat;
    }
    if (s == "three-quarters-sharp") {
        return MxmlAccidental.ThreeQuartersSharp;
    }
    if (s == "quarter-flat") {
        return MxmlAccidental.QuarterFlat;
    }
    if (s == "flat") {
        return MxmlAccidental.Flat;
    }
    if (s == "triple-sharp") {
        return MxmlAccidental.TripleSharp;
    }
    if (s == "flat-1") {
        return MxmlAccidental.Flat1;
    }
    if (s == "flat-2") {
        return MxmlAccidental.Flat2;
    }
    if (s == "flat-3") {
        return MxmlAccidental.Flat3;
    }
    if (s == "flat-4") {
        return MxmlAccidental.Flat4;
    }
    if (s == "triple-flat") {
        return MxmlAccidental.TripleFlat;
    }
    if (s == "flat-5") {
        return MxmlAccidental.Flat5;
    }
    if (s == "sharp") {
        return MxmlAccidental.Sharp;
    }
    if (s == "quarter-sharp") {
        return MxmlAccidental.QuarterSharp;
    }
    if (s == "slash-flat") {
        return MxmlAccidental.SlashFlat;
    }
    if (s == "flat-down") {
        return MxmlAccidental.FlatDown;
    }
    if (s == "natural-down") {
        return MxmlAccidental.NaturalDown;
    }
    if (s == "slash-quarter-sharp") {
        return MxmlAccidental.SlashQuarterSharp;
    }
    if (s == "sharp-sharp") {
        return MxmlAccidental.SharpSharp;
    }
    if (s == "sharp-1") {
        return MxmlAccidental.Sharp1;
    }
    if (s == "flat-up") {
        return MxmlAccidental.FlatUp;
    }
    if (s == "sharp-2") {
        return MxmlAccidental.Sharp2;
    }
    if (s == "sharp-3") {
        return MxmlAccidental.Sharp3;
    }
    if (s == "double-sharp") {
        return MxmlAccidental.DoubleSharp;
    }
    if (s == "sharp-4") {
        return MxmlAccidental.Sharp4;
    }
    if (s == "sharp-5") {
        return MxmlAccidental.Sharp5;
    }
    if (s == "sori") {
        return MxmlAccidental.Sori;
    }
    if (s == "double-slash-flat") {
        return MxmlAccidental.DoubleSlashFlat;
    }
    if (s == "sharp-down") {
        return MxmlAccidental.SharpDown;
    }
    if (s == "koron") {
        return MxmlAccidental.Koron;
    }
    if (s == "natural-up") {
        return MxmlAccidental.NaturalUp;
    }
    if (s == "slash-sharp") {
        return MxmlAccidental.SlashSharp;
    }
    if (s == "natural-sharp") {
        return MxmlAccidental.NaturalSharp;
    }
    if (s == "flat-flat") {
        return MxmlAccidental.FlatFlat;
    }
    if (s == "natural") {
        return MxmlAccidental.Natural;
    }
    if (s == "double-flat") {
        return MxmlAccidental.DoubleFlat;
    }
    return fallbackVal;
}
function xmlToAccidental(node) {
    let ret = {};
    let foundCautionary = false;
    let foundBracket = false;
    let foundSize = false;
    let foundParentheses = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundEditorial = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "cautionary") {
            let dataCautionary = xmlToYesNo(ch2);
            ret.cautionary = dataCautionary;
            foundCautionary = true;
        }
        if (ch2.name === "bracket") {
            let dataBracket = xmlToYesNo(ch2);
            ret.bracket = dataBracket;
            foundBracket = true;
        }
        if (ch2.name === "size") {
            let dataSize = getSymbolSize(ch2, SymbolSize.Unspecified);
            ret.size = dataSize;
            foundSize = true;
        }
        if (ch2.name === "parentheses") {
            let dataParentheses = xmlToYesNo(ch2);
            ret.parentheses = dataParentheses;
            foundParentheses = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "editorial") {
            let dataEditorial = xmlToYesNo(ch2);
            ret.editorial = dataEditorial;
            foundEditorial = true;
        }
    }
    let ch3 = node;
    let dataAccidental = getMxmlAccidental(ch3, null);
    ret.accidental = dataAccidental;
    if (!foundCautionary) {
        ret.cautionary = false;
    }
    if (!foundBracket) {
        ret.bracket = false;
    }
    if (!foundSize) {
        ret.size = SymbolSize.Unspecified;
    }
    if (!foundParentheses) {
        ret.parentheses = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundEditorial) {
        ret.editorial = false;
    }
    return ret;
}
function xmlToTimeModification(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "actual-notes") {
            let dataActualNotes = getNumber(ch, true);
            ret.actualNotes = dataActualNotes;
        }
        if (ch.nodeName === "normal-type") {
            let dataNormalType = getString(ch, true);
            ret.normalType = dataNormalType;
        }
        if (ch.nodeName === "normal-notes") {
            let dataNormalNotes = getNumber(ch, true);
            ret.normalNotes = dataNormalNotes;
        }
        if (ch.nodeName === "normal-dot") {
            let dataNormalDots = xmlToNormalDot(ch);
            ret.normalDots = (ret.normalDots || []).concat(dataNormalDots);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
var StemType;
(function (StemType) {
    StemType[StemType["None"] = 2] = "None";
    StemType[StemType["Double"] = 3] = "Double";
    StemType[StemType["Down"] = 0] = "Down";
    StemType[StemType["Up"] = 1] = "Up";
})(StemType || (exports.StemType = StemType = {}));
function getStemType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return StemType.None;
    }
    if (s == "double") {
        return StemType.Double;
    }
    if (s == "down") {
        return StemType.Down;
    }
    if (s == "up") {
        return StemType.Up;
    }
    return fallbackVal;
}
function xmlToStem(node) {
    let ret = {};
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataType = getStemType(ch3, null);
    ret.type = dataType;
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var NoteheadType;
(function (NoteheadType) {
    NoteheadType[NoteheadType["InvertedTriangle"] = 7] = "InvertedTriangle";
    NoteheadType[NoteheadType["CircleDot"] = 14] = "CircleDot";
    NoteheadType[NoteheadType["ArrowUp"] = 9] = "ArrowUp";
    NoteheadType[NoteheadType["Do"] = 18] = "Do";
    NoteheadType[NoteheadType["Mi"] = 20] = "Mi";
    NoteheadType[NoteheadType["Cross"] = 4] = "Cross";
    NoteheadType[NoteheadType["Slash"] = 0] = "Slash";
    NoteheadType[NoteheadType["Fa"] = 21] = "Fa";
    NoteheadType[NoteheadType["Triangle"] = 1] = "Triangle";
    NoteheadType[NoteheadType["FaUp"] = 22] = "FaUp";
    NoteheadType[NoteheadType["So"] = 23] = "So";
    NoteheadType[NoteheadType["LeftTriangle"] = 15] = "LeftTriangle";
    NoteheadType[NoteheadType["BackSlashed"] = 11] = "BackSlashed";
    NoteheadType[NoteheadType["None"] = 17] = "None";
    NoteheadType[NoteheadType["La"] = 24] = "La";
    NoteheadType[NoteheadType["Slashed"] = 10] = "Slashed";
    NoteheadType[NoteheadType["Normal"] = 12] = "Normal";
    NoteheadType[NoteheadType["Cluster"] = 13] = "Cluster";
    NoteheadType[NoteheadType["Ti"] = 25] = "Ti";
    NoteheadType[NoteheadType["Re"] = 19] = "Re";
    NoteheadType[NoteheadType["Rectangle"] = 16] = "Rectangle";
    NoteheadType[NoteheadType["Square"] = 3] = "Square";
    NoteheadType[NoteheadType["ArrowDown"] = 8] = "ArrowDown";
    NoteheadType[NoteheadType["X"] = 5] = "X";
    NoteheadType[NoteheadType["Diamond"] = 2] = "Diamond";
    NoteheadType[NoteheadType["CircleX"] = 6] = "CircleX";
})(NoteheadType || (exports.NoteheadType = NoteheadType = {}));
function getNoteheadType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "inverted triangle") {
        return NoteheadType.InvertedTriangle;
    }
    if (s == "circle dot") {
        return NoteheadType.CircleDot;
    }
    if (s == "arrow up") {
        return NoteheadType.ArrowUp;
    }
    if (s == "do") {
        return NoteheadType.Do;
    }
    if (s == "mi") {
        return NoteheadType.Mi;
    }
    if (s == "cross") {
        return NoteheadType.Cross;
    }
    if (s == "slash") {
        return NoteheadType.Slash;
    }
    if (s == "fa") {
        return NoteheadType.Fa;
    }
    if (s == "triangle") {
        return NoteheadType.Triangle;
    }
    if (s == "fa up") {
        return NoteheadType.FaUp;
    }
    if (s == "so") {
        return NoteheadType.So;
    }
    if (s == "left triangle") {
        return NoteheadType.LeftTriangle;
    }
    if (s == "back slashed") {
        return NoteheadType.BackSlashed;
    }
    if (s == "none") {
        return NoteheadType.None;
    }
    if (s == "la") {
        return NoteheadType.La;
    }
    if (s == "slashed") {
        return NoteheadType.Slashed;
    }
    if (s == "normal") {
        return NoteheadType.Normal;
    }
    if (s == "cluster") {
        return NoteheadType.Cluster;
    }
    if (s == "ti") {
        return NoteheadType.Ti;
    }
    if (s == "re") {
        return NoteheadType.Re;
    }
    if (s == "rectangle") {
        return NoteheadType.Rectangle;
    }
    if (s == "square") {
        return NoteheadType.Square;
    }
    if (s == "arrow down") {
        return NoteheadType.ArrowDown;
    }
    if (s == "x") {
        return NoteheadType.X;
    }
    if (s == "diamond") {
        return NoteheadType.Diamond;
    }
    if (s == "circle-x") {
        return NoteheadType.CircleX;
    }
    return fallbackVal;
}
function xmlToNotehead(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "filled") {
            let dataFilled = xmlToYesNo(ch2);
            ret.filled = dataFilled;
        }
        if (ch2.name === "parentheses") {
            let dataParentheses = xmlToYesNo(ch2);
            ret.parentheses = dataParentheses;
        }
    }
    let ch3 = node;
    let dataType = getNoteheadType(ch3, null);
    ret.type = dataType;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var BeamType;
(function (BeamType) {
    BeamType[BeamType["BackwardHook"] = 4] = "BackwardHook";
    BeamType[BeamType["Begin"] = 0] = "Begin";
    BeamType[BeamType["ForwardHook"] = 3] = "ForwardHook";
    BeamType[BeamType["Continue"] = 1] = "Continue";
    BeamType[BeamType["End"] = 2] = "End";
})(BeamType || (exports.BeamType = BeamType = {}));
function getBeamType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "backward hook") {
        return BeamType.BackwardHook;
    }
    if (s == "begin") {
        return BeamType.Begin;
    }
    if (s == "forward hook") {
        return BeamType.ForwardHook;
    }
    if (s == "continue") {
        return BeamType.Continue;
    }
    if (s == "end") {
        return BeamType.End;
    }
    return fallbackVal;
}
var AccelRitNone;
(function (AccelRitNone) {
    AccelRitNone[AccelRitNone["Accel"] = 0] = "Accel";
    AccelRitNone[AccelRitNone["None"] = 2] = "None";
    AccelRitNone[AccelRitNone["Rit"] = 1] = "Rit";
})(AccelRitNone || (exports.AccelRitNone = AccelRitNone = {}));
function getAccelRitNone(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "accel") {
        return AccelRitNone.Accel;
    }
    if (s == "none") {
        return AccelRitNone.None;
    }
    if (s == "rit") {
        return AccelRitNone.Rit;
    }
    return fallbackVal;
}
function xmlToBeam(node) {
    let ret = {};
    let foundRepeater = false;
    let foundNumber_ = false;
    let foundFan = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "repeater") {
            let dataRepeater = xmlToYesNo(ch2);
            ret.repeater = dataRepeater;
            foundRepeater = true;
        }
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "fan") {
            let dataFan = getAccelRitNone(ch2, AccelRitNone.None);
            ret.fan = dataFan;
            foundFan = true;
        }
    }
    let ch3 = node;
    let dataType = getBeamType(ch3, null);
    ret.type = dataType;
    if (!foundRepeater) {
        ret.repeater = false;
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundFan) {
        ret.fan = AccelRitNone.None;
    }
    return ret;
}
function xmlToNotations(node) {
    let ret = {};
    let foundPrintObject = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "slur") {
            let dataSlurs = xmlToSlur(ch);
            ret.slurs = (ret.slurs || []).concat(dataSlurs);
        }
        if (ch.nodeName === "articulations") {
            let dataArticulations = xmlToArticulations(ch);
            ret.articulations = (ret.articulations || []).concat(dataArticulations);
        }
        if (ch.nodeName === "slide") {
            let dataSlides = xmlToSlide(ch);
            ret.slides = (ret.slides || []).concat(dataSlides);
        }
        if (ch.nodeName === "technical") {
            let dataTechnicals = xmlToTechnical(ch);
            ret.technicals = (ret.technicals || []).concat(dataTechnicals);
        }
        if (ch.nodeName === "footnote") {
            let dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            let dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "tied") {
            let dataTieds = xmlToTied(ch);
            ret.tieds = (ret.tieds || []).concat(dataTieds);
        }
        if (ch.nodeName === "tuplet") {
            let dataTuplets = xmlToTuplet(ch);
            ret.tuplets = (ret.tuplets || []).concat(dataTuplets);
        }
        if (ch.nodeName === "glissando") {
            let dataGlissandos = xmlToGlissando(ch);
            ret.glissandos = (ret.glissandos || []).concat(dataGlissandos);
        }
        if (ch.nodeName === "dynamics") {
            let dataDynamics = xmlToDynamics(ch);
            ret.dynamics = (ret.dynamics || []).concat(dataDynamics);
        }
        if (ch.nodeName === "fermata") {
            let dataFermatas = xmlToFermata(ch);
            ret.fermatas = (ret.fermatas || []).concat(dataFermatas);
        }
        if (ch.nodeName === "accidental-mark") {
            let dataAccidentalMarks = xmlToAccidentalMark(ch);
            ret.accidentalMarks = (ret.accidentalMarks || []).concat(dataAccidentalMarks);
        }
        if (ch.nodeName === "ornaments") {
            let dataOrnaments = xmlToOrnaments(ch);
            ret.ornaments = (ret.ornaments || []).concat(dataOrnaments);
        }
        if (ch.nodeName === "arpeggiate") {
            let dataArpeggiates = xmlToArpeggiate(ch);
            ret.arpeggiates = (ret.arpeggiates || []).concat(dataArpeggiates);
        }
        if (ch.nodeName === "non-arpeggiate") {
            let dataNonArpeggiates = xmlToNonArpeggiate(ch);
            ret.nonArpeggiates = (ret.nonArpeggiates || []).concat(dataNonArpeggiates);
        }
        if (ch.nodeName === "other-notation") {
            let dataOtherNotations = xmlToOtherNotation(ch);
            ret.otherNotations = (ret.otherNotations || []).concat(dataOtherNotations);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    return ret;
}
function xmlToTied(node) {
    let ret = {};
    let foundLineType = false;
    let foundDashLength = false;
    let foundSpaceLength = false;
    let foundPlacement = false;
    let foundOrientation = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "line-type") {
            let dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "orientation") {
            let dataOrientation = getOverUnder(ch2, OverUnder.Unspecified);
            ret.orientation = dataOrientation;
            foundOrientation = true;
        }
        if (ch2.name === "bezier-x2") {
            let dataBezierX2 = getNumber(ch2, true);
            ret.bezierX2 = dataBezierX2;
        }
        if (ch2.name === "bezier-offset") {
            let dataBezierOffset = getNumber(ch2, true);
            ret.bezierOffset = dataBezierOffset;
        }
        if (ch2.name === "bezier-offset2") {
            let dataBezierOffset2 = getNumber(ch2, true);
            ret.bezierOffset2 = dataBezierOffset2;
        }
        if (ch2.name === "bezier-x") {
            let dataBezierX = getNumber(ch2, true);
            ret.bezierX = dataBezierX;
        }
        if (ch2.name === "bezier-y") {
            let dataBezierY = getNumber(ch2, true);
            ret.bezierY = dataBezierY;
        }
        if (ch2.name === "bezier-y2") {
            let dataBezierY2 = getNumber(ch2, true);
            ret.bezierY2 = dataBezierY2;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStopContinue(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundOrientation) {
        ret.orientation = OverUnder.Unspecified;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToSlur(node) {
    let ret = {};
    let foundNumber_ = false;
    let foundLineType = false;
    let foundDashLength = false;
    let foundSpaceLength = false;
    let foundPlacement = false;
    let foundOrientation = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "line-type") {
            let dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "orientation") {
            let dataOrientation = getOverUnder(ch2, OverUnder.Unspecified);
            ret.orientation = dataOrientation;
            foundOrientation = true;
        }
        if (ch2.name === "bezier-x2") {
            let dataBezierX2 = getNumber(ch2, true);
            ret.bezierX2 = dataBezierX2;
        }
        if (ch2.name === "bezier-offset") {
            let dataBezierOffset = getNumber(ch2, true);
            ret.bezierOffset = dataBezierOffset;
        }
        if (ch2.name === "bezier-offset2") {
            let dataBezierOffset2 = getNumber(ch2, true);
            ret.bezierOffset2 = dataBezierOffset2;
        }
        if (ch2.name === "bezier-x") {
            let dataBezierX = getNumber(ch2, true);
            ret.bezierX = dataBezierX;
        }
        if (ch2.name === "bezier-y") {
            let dataBezierY = getNumber(ch2, true);
            ret.bezierY = dataBezierY;
        }
        if (ch2.name === "bezier-y2") {
            let dataBezierY2 = getNumber(ch2, true);
            ret.bezierY2 = dataBezierY2;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStopContinue(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundOrientation) {
        ret.orientation = OverUnder.Unspecified;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var ActualBothNone;
(function (ActualBothNone) {
    ActualBothNone[ActualBothNone["None"] = 2] = "None";
    ActualBothNone[ActualBothNone["Both"] = 1] = "Both";
    ActualBothNone[ActualBothNone["Actual"] = 0] = "Actual";
})(ActualBothNone || (exports.ActualBothNone = ActualBothNone = {}));
function getActualBothNone(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return ActualBothNone.None;
    }
    if (s == "both") {
        return ActualBothNone.Both;
    }
    if (s == "actual") {
        return ActualBothNone.Actual;
    }
    return fallbackVal;
}
function xmlToTuplet(node) {
    let ret = {};
    let foundBracket = false;
    let foundShowNumber = false;
    let foundLineShape = false;
    let foundPlacement = false;
    let foundShowType = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "tuplet-normal") {
            let dataTupletNormal = xmlToTupletNormal(ch);
            ret.tupletNormal = dataTupletNormal;
        }
        if (ch.nodeName === "tuplet-actual") {
            let dataTupletActual = xmlToTupletActual(ch);
            ret.tupletActual = dataTupletActual;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "bracket") {
            let dataBracket = xmlToYesNo(ch2);
            ret.bracket = dataBracket;
            foundBracket = true;
        }
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "show-number") {
            let dataShowNumber = getActualBothNone(ch2, ActualBothNone.Actual);
            ret.showNumber = dataShowNumber;
            foundShowNumber = true;
        }
        if (ch2.name === "line-shape") {
            let dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "show-type") {
            let dataShowType = getActualBothNone(ch2, ActualBothNone.None);
            ret.showType = dataShowType;
            foundShowType = true;
        }
    }
    if (!foundBracket) {
        ret.bracket = false;
    }
    if (!foundShowNumber) {
        ret.showNumber = ActualBothNone.Actual;
    }
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundShowType) {
        ret.showType = ActualBothNone.None;
    }
    return ret;
}
function xmlToTupletActual(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "tuplet-number") {
            let dataTupletNumber = xmlToTupletNumber(ch);
            ret.tupletNumber = dataTupletNumber;
        }
        if (ch.nodeName === "tuplet-dot") {
            let dataTupletDots = xmlToTupletDot(ch);
            ret.tupletDots = (ret.tupletDots || []).concat(dataTupletDots);
        }
        if (ch.nodeName === "tuplet-type") {
            let dataTupletType = xmlToTupletType(ch);
            ret.tupletType = dataTupletType;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToTupletNormal(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "tuplet-number") {
            let dataTupletNumber = xmlToTupletNumber(ch);
            ret.tupletNumber = dataTupletNumber;
        }
        if (ch.nodeName === "tuplet-dot") {
            let dataTupletDots = xmlToTupletDot(ch);
            ret.tupletDots = (ret.tupletDots || []).concat(dataTupletDots);
        }
        if (ch.nodeName === "tuplet-type") {
            let dataTupletType = xmlToTupletType(ch);
            ret.tupletType = dataTupletType;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToTupletNumber(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToTupletType(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToTupletDot(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToGlissando(node) {
    let ret = {};
    let foundLineType = false;
    let foundDashLength = false;
    let foundSpaceLength = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundNumber = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "line-type") {
            let dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber = true;
        }
    }
    let ch3 = node;
    let dataText = getString(ch3, false);
    ret.text = dataText;
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundNumber) {
        ret.number = 1;
    }
    return ret;
}
function xmlToSlide(node) {
    let ret = {};
    let foundLineType = false;
    let foundDashLength = false;
    let foundSpaceLength = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundFirstBeat = false;
    let foundNumber = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "line-type") {
            let dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "first-beat") {
            let dataFirstBeat = getNumber(ch2, true);
            ret.firstBeat = dataFirstBeat;
            foundFirstBeat = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber = true;
        }
    }
    let ch3 = node;
    let dataText = getString(ch3, false);
    ret.text = dataText;
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundFirstBeat) {
        ret.firstBeat = 25;
    }
    if (!foundNumber) {
        ret.number = 1;
    }
    return ret;
}
function xmlToOtherNotation(node) {
    let ret = {};
    let foundPrintObject = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundNumber = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStopSingle(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, null);
            foundNumber = true;
            ret.type = dataNumber;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundNumber) {
        ret.number = 1;
    }
    return ret;
}
function xmlToOtherDirection(node) {
    let ret = {};
    let foundPrintObject = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToOrnaments(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundStartNote = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundTrillStep = false;
    let foundTwoNoteTurn = false;
    let foundSecondBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "delayed-inverted-turn") {
            let dataDelayedInvertedTurn = xmlToDelayedInvertedTurn(ch);
            ret.delayedInvertedTurn = dataDelayedInvertedTurn;
        }
        if (ch.nodeName === "shake") {
            let dataShake = xmlToShake(ch);
            ret.shake = dataShake;
        }
        if (ch.nodeName === "turn") {
            let dataTurn = xmlToTurn(ch);
            ret.turn = dataTurn;
        }
        if (ch.nodeName === "inverted-turn") {
            let dataInvertedTurn = xmlToInvertedTurn(ch);
            ret.invertedTurn = dataInvertedTurn;
        }
        if (ch.nodeName === "other-ornament") {
            let dataOtherOrnament = xmlToOtherOrnament(ch);
            ret.otherOrnament = dataOtherOrnament;
        }
        if (ch.nodeName === "delayed-turn") {
            let dataDelayedTurn = xmlToDelayedTurn(ch);
            ret.delayedTurn = dataDelayedTurn;
        }
        if (ch.nodeName === "vertical-turn") {
            let dataVerticalTurn = xmlToVerticalTurn(ch);
            ret.verticalTurn = dataVerticalTurn;
        }
        if (ch.nodeName === "wavy-line") {
            let dataWavyLine = xmlToWavyLine(ch);
            ret.wavyLine = dataWavyLine;
        }
        if (ch.nodeName === "tremolo") {
            let dataTremolo = xmlToTremolo(ch);
            ret.tremolo = dataTremolo;
        }
        if (ch.nodeName === "accidental-mark") {
            let dataAccidentalMarks = xmlToAccidentalMark(ch);
            ret.accidentalMarks = (ret.accidentalMarks || []).concat(dataAccidentalMarks);
        }
        if (ch.nodeName === "trill-mark") {
            let dataTrillMark = xmlToTrillMark(ch);
            ret.trillMark = dataTrillMark;
        }
        if (ch.nodeName === "mordent") {
            let dataMordent = xmlToMordent(ch);
            ret.mordent = dataMordent;
        }
        if (ch.nodeName === "inverted-mordent") {
            let dataInvertedMordent = xmlToInvertedMordent(ch);
            ret.invertedMordent = dataInvertedMordent;
        }
        if (ch.nodeName === "schleifer") {
            let dataSchleifer = xmlToSchleifer(ch);
            ret.schleifer = dataSchleifer;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            let dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            let dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            let dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            let dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToTrillMark(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundStartNote = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundTrillStep = false;
    let foundTwoNoteTurn = false;
    let foundSecondBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            let dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            let dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            let dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            let dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToTurn(node) {
    let ret = {};
    let foundSlash = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundStartNote = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundTrillStep = false;
    let foundTwoNoteTurn = false;
    let foundSecondBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "slash") {
            let dataSlash = xmlToYesNo(ch2);
            ret.slash = dataSlash;
            foundSlash = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            let dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            let dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            let dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            let dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundSlash) {
        ret.slash = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToDelayedTurn(node) {
    let ret = {};
    let foundSlash = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundStartNote = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundTrillStep = false;
    let foundTwoNoteTurn = false;
    let foundSecondBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "slash") {
            let dataSlash = xmlToYesNo(ch2);
            ret.slash = dataSlash;
            foundSlash = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            let dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            let dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            let dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            let dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundSlash) {
        ret.slash = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToInvertedTurn(node) {
    let ret = {};
    let foundSlash = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundStartNote = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundTrillStep = false;
    let foundTwoNoteTurn = false;
    let foundSecondBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "slash") {
            let dataSlash = xmlToYesNo(ch2);
            ret.slash = dataSlash;
            foundSlash = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            let dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            let dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            let dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            let dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundSlash) {
        ret.slash = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToDelayedInvertedTurn(node) {
    let ret = {};
    let foundSlash = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundStartNote = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundTrillStep = false;
    let foundTwoNoteTurn = false;
    let foundSecondBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "slash") {
            let dataSlash = xmlToYesNo(ch2);
            ret.slash = dataSlash;
            foundSlash = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            let dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            let dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            let dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            let dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundSlash) {
        ret.slash = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToVerticalTurn(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundStartNote = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundTrillStep = false;
    let foundTwoNoteTurn = false;
    let foundSecondBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            let dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            let dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            let dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            let dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToShake(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundStartNote = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundTrillStep = false;
    let foundTwoNoteTurn = false;
    let foundSecondBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            let dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            let dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            let dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            let dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToMordent(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundStartNote = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundTrillStep = false;
    let foundTwoNoteTurn = false;
    let foundSecondBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "long") {
            let dataLong = xmlToYesNo(ch2);
            ret.long = dataLong;
        }
        if (ch2.name === "approach") {
            let dataApproach = getAboveBelow(ch2, null);
            ret.approach = dataApproach;
        }
        if (ch2.name === "departure") {
            let dataDeparture = getAboveBelow(ch2, null);
            ret.departure = dataDeparture;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            let dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            let dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            let dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            let dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToInvertedMordent(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundStartNote = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundTrillStep = false;
    let foundTwoNoteTurn = false;
    let foundSecondBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "long") {
            let dataLong = xmlToYesNo(ch2);
            ret.long = dataLong;
        }
        if (ch2.name === "approach") {
            let dataApproach = getAboveBelow(ch2, null);
            ret.approach = dataApproach;
        }
        if (ch2.name === "departure") {
            let dataDeparture = getAboveBelow(ch2, null);
            ret.departure = dataDeparture;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "start-note") {
            let dataStartNote = getUpperMainBelow(ch2, UpperMainBelow.Upper);
            ret.startNote = dataStartNote;
            foundStartNote = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "trill-step") {
            let dataTrillStep = getWholeHalfUnison(ch2, WholeHalfUnison.Whole);
            ret.trillStep = dataTrillStep;
            foundTrillStep = true;
        }
        if (ch2.name === "two-note-turn") {
            let dataTwoNoteTurn = getWholeHalfNone(ch2, WholeHalfNone.None);
            ret.twoNoteTurn = dataTwoNoteTurn;
            foundTwoNoteTurn = true;
        }
        if (ch2.name === "second-beat") {
            let dataSecondBeat = getNumber(ch2, true);
            ret.secondBeat = dataSecondBeat;
            foundSecondBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundStartNote) {
        ret.startNote = UpperMainBelow.Upper;
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundTrillStep) {
        ret.trillStep = WholeHalfUnison.Whole;
    }
    if (!foundTwoNoteTurn) {
        ret.twoNoteTurn = WholeHalfNone.None;
    }
    if (!foundSecondBeat) {
        ret.secondBeat = 25;
    }
    return ret;
}
function xmlToSchleifer(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToTremolo(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundType = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStopSingle(ch2, StartStopSingle.Single);
            ret.type = dataType;
            foundType = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundType) {
        ret.type = StartStopSingle.Single;
    }
    return ret;
}
function xmlToOtherOrnament(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStopSingle(ch2, null);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToAccidentalMark(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    let ch3 = node;
    let dataMark = getString(ch3, true);
    ret.mark = dataMark;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToTechnical(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "triple-tongue") {
            let dataTripleTongue = xmlToTripleTongue(ch);
            ret.tripleTongue = dataTripleTongue;
        }
        if (ch.nodeName === "toe") {
            let dataToe = xmlToToe(ch);
            ret.toe = dataToe;
        }
        if (ch.nodeName === "hole") {
            let dataHole = xmlToHole(ch);
            ret.hole = dataHole;
        }
        if (ch.nodeName === "hammer-on") {
            let dataHammerOn = xmlToHammerOn(ch);
            ret.hammerOn = dataHammerOn;
        }
        if (ch.nodeName === "up-bow") {
            let dataUpBow = xmlToUpBow(ch);
            ret.upBow = dataUpBow;
        }
        if (ch.nodeName === "down-bow") {
            let dataDownBow = xmlToDownBow(ch);
            ret.downBow = dataDownBow;
        }
        if (ch.nodeName === "fret") {
            let dataFret = xmlToFret(ch);
            ret.fret = dataFret;
        }
        if (ch.nodeName === "tap") {
            let dataTap = xmlToTap(ch);
            ret.tap = dataTap;
        }
        if (ch.nodeName === "pull-off") {
            let dataPullOff = xmlToPullOff(ch);
            ret.pullOff = dataPullOff;
        }
        if (ch.nodeName === "handbell") {
            let dataHandbell = xmlToHandbell(ch);
            ret.handbell = dataHandbell;
        }
        if (ch.nodeName === "bend") {
            let dataBend = xmlToBend(ch);
            ret.bend = dataBend;
        }
        if (ch.nodeName === "thumb-position") {
            let dataThumbPosition = xmlToThumbPosition(ch);
            ret.thumbPosition = dataThumbPosition;
        }
        if (ch.nodeName === "stopped") {
            let dataStopped = xmlToStopped(ch);
            ret.stopped = dataStopped;
        }
        if (ch.nodeName === "pluck") {
            let dataPluck = xmlToPluck(ch);
            ret.pluck = dataPluck;
        }
        if (ch.nodeName === "double-tongue") {
            let dataDoubleTongue = xmlToDoubleTongue(ch);
            ret.doubleTongue = dataDoubleTongue;
        }
        if (ch.nodeName === "string") {
            let dataString = xmlToString(ch);
            ret.string = dataString;
        }
        if (ch.nodeName === "open-string") {
            let dataOpenString = xmlToOpenString(ch);
            ret.openString = dataOpenString;
        }
        if (ch.nodeName === "fingernails") {
            let dataFingernails = xmlToFingernails(ch);
            ret.fingernails = dataFingernails;
        }
        if (ch.nodeName === "arrow") {
            let dataArrow = xmlToArrow(ch);
            ret.arrow = dataArrow;
        }
        if (ch.nodeName === "harmonic") {
            let dataHarmonic = xmlToHarmonic(ch);
            ret.harmonic = dataHarmonic;
        }
        if (ch.nodeName === "heel") {
            let dataHeel = xmlToHeel(ch);
            ret.heel = dataHeel;
        }
        if (ch.nodeName === "other-technical") {
            let dataOtherTechnical = xmlToOtherTechnical(ch);
            ret.otherTechnical = dataOtherTechnical;
        }
        if (ch.nodeName === "snap-pizzicato") {
            let dataSnapPizzicato = xmlToSnapPizzicato(ch);
            ret.snapPizzicato = dataSnapPizzicato;
        }
        if (ch.nodeName === "fingering") {
            let dataFingering = xmlToFingering(ch);
            ret.fingering = dataFingering;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToUpBow(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToDownBow(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToHarmonic(node) {
    let ret = {};
    let foundPrintObject = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "artificial") {
            let dataArtificial = true;
            ret.artificial = dataArtificial;
        }
        if (ch.nodeName === "touching-pitch") {
            let dataTouchingPitch = true;
            ret.touchingPitch = dataTouchingPitch;
        }
        if (ch.nodeName === "sounding-pitch") {
            let dataSoundingPitch = true;
            ret.soundingPitch = dataSoundingPitch;
        }
        if (ch.nodeName === "natural") {
            let dataNatural = true;
            ret.natural = dataNatural;
        }
        if (ch.nodeName === "base-pitch") {
            let dataBasePitch = true;
            ret.basePitch = dataBasePitch;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToOpenString(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToThumbPosition(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToPluck(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToDoubleTongue(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToTripleTongue(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToStopped(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToSnapPizzicato(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToHammerOn(node) {
    let ret = {};
    let foundNumber_ = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToPullOff(node) {
    let ret = {};
    let foundNumber_ = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToBend(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundAccelerate = false;
    let foundBeats = false;
    let foundLastBeat = false;
    let foundFirstBeat = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "bend-alter") {
            let dataBendAlter = getString(ch, true);
            ret.bendAlter = dataBendAlter;
        }
        if (ch.nodeName === "with-bar") {
            let dataWithBar = xmlToWithBar(ch);
            ret.withBar = dataWithBar;
        }
        if (ch.nodeName === "pre-bend") {
            let dataPreBend = true;
            ret.preBend = dataPreBend;
        }
        if (ch.nodeName === "release") {
            let dataRelease = true;
            ret.release = dataRelease;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "accelerate") {
            let dataAccelerate = xmlToYesNo(ch2);
            ret.accelerate = dataAccelerate;
            foundAccelerate = true;
        }
        if (ch2.name === "beats") {
            let dataBeats = getNumber(ch2, true);
            ret.beats = dataBeats;
            foundBeats = true;
        }
        if (ch2.name === "last-beat") {
            let dataLastBeat = getNumber(ch2, true);
            ret.lastBeat = dataLastBeat;
            foundLastBeat = true;
        }
        if (ch2.name === "first-beat") {
            let dataFirstBeat = getNumber(ch2, true);
            ret.firstBeat = dataFirstBeat;
            foundFirstBeat = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundAccelerate) {
        ret.accelerate = false;
    }
    if (!foundBeats) {
        ret.beats = 4;
    }
    if (!foundLastBeat) {
        ret.lastBeat = 75;
    }
    if (!foundFirstBeat) {
        ret.firstBeat = 25;
    }
    return ret;
}
function xmlToWithBar(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToTap(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToHeel(node) {
    let ret = {};
    let foundSubstitution = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "substitution") {
            let dataSubstitution = xmlToYesNo(ch2);
            ret.substitution = dataSubstitution;
            foundSubstitution = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundSubstitution) {
        ret.substitution = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToToe(node) {
    let ret = {};
    let foundSubstitution = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "substitution") {
            let dataSubstitution = xmlToYesNo(ch2);
            ret.substitution = dataSubstitution;
            foundSubstitution = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundSubstitution) {
        ret.substitution = false;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToFingernails(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToHole(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "hole-closed") {
            let dataHoleClosed = xmlToHoleClosed(ch);
            ret.holeClosed = dataHoleClosed;
        }
        if (ch.nodeName === "hole-shape") {
            let dataHoleShape = getString(ch, true);
            ret.holeShape = dataHoleShape;
        }
        if (ch.nodeName === "hole-type") {
            let dataHoleType = getString(ch, true);
            ret.holeType = dataHoleType;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
var HoleLocation;
(function (HoleLocation) {
    HoleLocation[HoleLocation["Right"] = 0] = "Right";
    HoleLocation[HoleLocation["Top"] = 3] = "Top";
    HoleLocation[HoleLocation["Bottom"] = 1] = "Bottom";
    HoleLocation[HoleLocation["Left"] = 2] = "Left";
})(HoleLocation || (exports.HoleLocation = HoleLocation = {}));
function getHoleLocation(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return HoleLocation.Right;
    }
    if (s == "top") {
        return HoleLocation.Top;
    }
    if (s == "bottom") {
        return HoleLocation.Bottom;
    }
    if (s == "left") {
        return HoleLocation.Left;
    }
    return fallbackVal;
}
var HoleClosedType;
(function (HoleClosedType) {
    HoleClosedType[HoleClosedType["No"] = 1] = "No";
    HoleClosedType[HoleClosedType["Yes"] = 0] = "Yes";
    HoleClosedType[HoleClosedType["Half"] = 2] = "Half";
})(HoleClosedType || (exports.HoleClosedType = HoleClosedType = {}));
function getHoleClosedType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "no") {
        return HoleClosedType.No;
    }
    if (s == "yes") {
        return HoleClosedType.Yes;
    }
    if (s == "half") {
        return HoleClosedType.Half;
    }
    return fallbackVal;
}
function xmlToHoleClosed(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "location") {
            let dataLocation = getHoleLocation(ch2, null);
            ret.location = dataLocation;
        }
    }
    let ch3 = node;
    let dataData = getHoleClosedType(ch3, null);
    ret.data = dataData;
    return ret;
}
function xmlToArrow(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "arrow-style") {
            let dataArrowStyle = getString(ch, true);
            ret.arrowStyle = dataArrowStyle;
        }
        if (ch.nodeName === "arrow-direction") {
            let dataArrowDirection = getString(ch, true);
            ret.arrowDirection = dataArrowDirection;
        }
        if (ch.nodeName === "circular-arrow") {
            let dataCircularArrow = getString(ch, true);
            ret.circularArrow = dataCircularArrow;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToHandbell(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToOtherTechnical(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToArticulations(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "accent") {
            let dataAccent = xmlToAccent(ch);
            ret.accent = dataAccent;
        }
        if (ch.nodeName === "doit") {
            let dataDoit = xmlToDoit(ch);
            ret.doit = dataDoit;
        }
        if (ch.nodeName === "breath-mark") {
            let dataBreathMark = xmlToBreathMark(ch);
            ret.breathMark = dataBreathMark;
        }
        if (ch.nodeName === "other-articulation") {
            let dataOtherArticulations = xmlToOtherArticulation(ch);
            ret.otherArticulations = (ret.otherArticulations || []).concat(dataOtherArticulations);
        }
        if (ch.nodeName === "detached-legato") {
            let dataDetachedLegato = xmlToDetachedLegato(ch);
            ret.detachedLegato = dataDetachedLegato;
        }
        if (ch.nodeName === "staccatissimo") {
            let dataStaccatissimo = xmlToStaccatissimo(ch);
            ret.staccatissimo = dataStaccatissimo;
        }
        if (ch.nodeName === "plop") {
            let dataPlop = xmlToPlop(ch);
            ret.plop = dataPlop;
        }
        if (ch.nodeName === "unstress") {
            let dataUnstress = xmlToUnstress(ch);
            ret.unstress = dataUnstress;
        }
        if (ch.nodeName === "strong-accent") {
            let dataStrongAccent = xmlToStrongAccent(ch);
            ret.strongAccent = dataStrongAccent;
        }
        if (ch.nodeName === "staccato") {
            let dataStaccato = xmlToStaccato(ch);
            ret.staccato = dataStaccato;
        }
        if (ch.nodeName === "spiccato") {
            let dataSpiccato = xmlToSpiccato(ch);
            ret.spiccato = dataSpiccato;
        }
        if (ch.nodeName === "scoop") {
            let dataScoop = xmlToScoop(ch);
            ret.scoop = dataScoop;
        }
        if (ch.nodeName === "falloff") {
            let dataFalloff = xmlToFalloff(ch);
            ret.falloff = dataFalloff;
        }
        if (ch.nodeName === "caesura") {
            let dataCaesura = xmlToCaesura(ch);
            ret.caesura = dataCaesura;
        }
        if (ch.nodeName === "stress") {
            let dataStress = xmlToStress(ch);
            ret.stress = dataStress;
        }
        if (ch.nodeName === "tenuto") {
            let dataTenuto = xmlToTenuto(ch);
            ret.tenuto = dataTenuto;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToAccent(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToStrongAccent(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    let foundType = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            let dataType = getUpDown(ch2, UpDown.Up);
            ret.type = dataType;
            foundType = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundType) {
        ret.type = UpDown.Up;
    }
    return ret;
}
function xmlToStaccato(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToTenuto(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToDetachedLegato(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToStaccatissimo(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToSpiccato(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToScoop(node) {
    let ret = {};
    let foundLineShape = false;
    let foundLineType = false;
    let foundDashLength = false;
    let foundSpaceLength = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            let dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            let dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToPlop(node) {
    let ret = {};
    let foundLineShape = false;
    let foundLineType = false;
    let foundDashLength = false;
    let foundSpaceLength = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            let dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            let dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToDoit(node) {
    let ret = {};
    let foundLineShape = false;
    let foundLineType = false;
    let foundDashLength = false;
    let foundSpaceLength = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            let dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            let dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToFalloff(node) {
    let ret = {};
    let foundLineShape = false;
    let foundLineType = false;
    let foundDashLength = false;
    let foundSpaceLength = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            let dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            let dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
var BreathMarkType;
(function (BreathMarkType) {
    BreathMarkType[BreathMarkType["Empty"] = 2] = "Empty";
    BreathMarkType[BreathMarkType["Comma"] = 0] = "Comma";
    BreathMarkType[BreathMarkType["Tick"] = 1] = "Tick";
})(BreathMarkType || (exports.BreathMarkType = BreathMarkType = {}));
function getBreathMarkType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "") {
        return BreathMarkType.Empty;
    }
    if (s == "comma") {
        return BreathMarkType.Comma;
    }
    if (s == "tick") {
        return BreathMarkType.Tick;
    }
    return fallbackVal;
}
function xmlToBreathMark(node) {
    let ret = {};
    let foundLineShape = false;
    let foundLineType = false;
    let foundDashLength = false;
    let foundSpaceLength = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "line-shape") {
            let dataLineShape = getStraightCurved(ch2, StraightCurved.Straight);
            ret.lineShape = dataLineShape;
            foundLineShape = true;
        }
        if (ch2.name === "line-type") {
            let dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    let ch3 = node;
    let dataType = getBreathMarkType(ch3, null);
    ret.type = dataType;
    if (!foundLineShape) {
        ret.lineShape = StraightCurved.Straight;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToCaesura(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToStress(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToUnstress(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToOtherArticulation(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    return ret;
}
function xmlToArpeggiate(node) {
    let ret = {};
    let foundNumber_ = false;
    let foundPlacement = false;
    let foundColor = false;
    let foundDirection = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "direction") {
            let dataDirection = getUpDown(ch2, UpDown.Up);
            ret.direction = dataDirection;
            foundDirection = true;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundDirection) {
        ret.direction = UpDown.Up;
    }
    return ret;
}
function xmlToNonArpeggiate(node) {
    let ret = {};
    let foundNumber_ = false;
    let foundPlacement = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            let dataType = getTopBottom(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToLaughing(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    ret._class = "Laughing";
    return ret;
}
function xmlToHumming(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    ret._class = "Humming";
    return ret;
}
function xmlToEndLine(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    ret._class = "EndLine";
    return ret;
}
function xmlToEndParagraph(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    ret._class = "EndParagraph";
    return ret;
}
function xmlToLyricParts(node) {
    let rarr = [];
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "extend") {
            let data = xmlToExtend(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "end-line") {
            let data = xmlToEndLine(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "syllabic") {
            let data = xmlToSyllabic(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "text") {
            let data = xmlToText(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "laughing") {
            let data = xmlToLaughing(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "humming") {
            let data = xmlToHumming(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "end-paragraph") {
            let data = xmlToEndParagraph(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "elision") {
            let data = xmlToElision(ch);
            rarr = (rarr || []).concat(data);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return rarr;
}
function xmlToText(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundUnderline = false;
    let foundOverline = false;
    let foundLineThrough = false;
    let foundRotation = false;
    let foundLetterSpacing = false;
    let foundDir = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "underline") {
            let dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            let dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            let dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            let dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            let dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "dir") {
            let dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    ret._class = "Text";
    return ret;
}
var SyllabicType;
(function (SyllabicType) {
    SyllabicType[SyllabicType["Single"] = 0] = "Single";
    SyllabicType[SyllabicType["Begin"] = 1] = "Begin";
    SyllabicType[SyllabicType["Middle"] = 3] = "Middle";
    SyllabicType[SyllabicType["End"] = 2] = "End";
})(SyllabicType || (exports.SyllabicType = SyllabicType = {}));
function getSyllabicType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "single") {
        return SyllabicType.Single;
    }
    if (s == "begin") {
        return SyllabicType.Begin;
    }
    if (s == "middle") {
        return SyllabicType.Middle;
    }
    if (s == "end") {
        return SyllabicType.End;
    }
    return fallbackVal;
}
function xmlToSyllabic(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getSyllabicType(ch3, null);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    ret._class = "Syllabic";
    return ret;
}
function xmlToElision(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    ret._class = "Elision";
    return ret;
}
function xmlToExtend(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundType = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStopContinue(ch2, StartStopContinue.Start);
            ret.type = dataType;
            foundType = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundType) {
        ret.type = StartStopContinue.Start;
    }
    ret._class = "Extend";
    return ret;
}
function xmlToFiguredBass(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPrintObject = false;
    let foundPrintSpacing = false;
    let foundParentheses = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "footnote") {
            let dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            let dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "figure") {
            let dataFigures = xmlToFigure(ch);
            ret.figures = (ret.figures || []).concat(dataFigures);
        }
        if (ch.nodeName === "duration") {
            let dataDuration = getNumber(ch, true);
            ret.duration = dataDuration;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-dot") {
            let dataPrintDot = xmlToYesNo(ch2);
            ret.printDot = dataPrintDot;
        }
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "print-spacing") {
            let dataPrintSpacing = xmlToYesNo(ch2);
            ret.printSpacing = dataPrintSpacing;
            foundPrintSpacing = true;
        }
        if (ch2.name === "print-lyric") {
            let dataPrintLyric = xmlToYesNo(ch2);
            ret.printLyric = dataPrintLyric;
        }
        if (ch2.name === "parentheses") {
            let dataParentheses = xmlToYesNo(ch2);
            ret.parentheses = dataParentheses;
            foundParentheses = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundPrintSpacing) {
        ret.printSpacing = true;
    }
    if (!foundParentheses) {
        ret.parentheses = false;
    }
    ret._class = "FiguredBass";
    return ret;
}
function xmlToFigure(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "prefix") {
            let dataPrefix = xmlToPrefix(ch);
            ret.prefix = dataPrefix;
        }
        if (ch.nodeName === "figure-number") {
            let dataFigureNumber = xmlToFigureNumber(ch);
            ret.figureNumber = dataFigureNumber;
        }
        if (ch.nodeName === "extend") {
            let dataExtend = xmlToExtend(ch);
            ret.extend = dataExtend;
        }
        if (ch.nodeName === "suffix") {
            let dataSuffix = xmlToSuffix(ch);
            ret.suffix = dataSuffix;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToPrefix(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToFigureNumber(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToSuffix(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToBackup(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "footnote") {
            let dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            let dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "duration") {
            let dataDuration = getNumber(ch, true);
            ret.duration = dataDuration;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    ret._class = "Backup";
    return ret;
}
function xmlToForward(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "voice") {
            let dataVoice = getNumber(ch, true);
            ret.voice = dataVoice;
        }
        if (ch.nodeName === "footnote") {
            let dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            let dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "duration") {
            let dataDuration = getNumber(ch, true);
            ret.duration = dataDuration;
        }
        if (ch.nodeName === "staff") {
            let dataStaff = getNumber(ch, true);
            ret.staff = dataStaff;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    ret._class = "Forward";
    return ret;
}
var BarlineLocation;
(function (BarlineLocation) {
    BarlineLocation[BarlineLocation["Right"] = 1] = "Right";
    BarlineLocation[BarlineLocation["Middle"] = 2] = "Middle";
    BarlineLocation[BarlineLocation["Left"] = 0] = "Left";
})(BarlineLocation || (exports.BarlineLocation = BarlineLocation = {}));
function getBarlineLocation(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return BarlineLocation.Right;
    }
    if (s == "middle") {
        return BarlineLocation.Middle;
    }
    if (s == "left") {
        return BarlineLocation.Left;
    }
    return fallbackVal;
}
function xmlToBarline(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "segno") {
            let dataSegno = xmlToSegno(ch);
            ret.segno = dataSegno;
        }
        if (ch.nodeName === "coda") {
            let dataCoda = xmlToCoda(ch);
            ret.coda = dataCoda;
        }
        if (ch.nodeName === "footnote") {
            let dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            let dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "wavy-line") {
            let dataWavyLine = xmlToWavyLine(ch);
            ret.wavyLine = dataWavyLine;
        }
        if (ch.nodeName === "fermata") {
            let dataFermatas = xmlToFermata(ch);
            ret.fermatas = (ret.fermatas || []).concat(dataFermatas);
        }
        if (ch.nodeName === "bar-style") {
            let dataBarStyle = xmlToBarStyle(ch);
            ret.barStyle = dataBarStyle;
        }
        if (ch.nodeName === "ending") {
            let dataEnding = xmlToEnding(ch);
            ret.ending = dataEnding;
        }
        if (ch.nodeName === "repeat") {
            let dataRepeat = xmlToRepeat(ch);
            ret.repeat = dataRepeat;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "location") {
            let dataLocation = getBarlineLocation(ch2, null);
            ret.location = dataLocation;
        }
        if (ch2.name === "coda") {
            let dataCodaAttrib = getString(ch2, true);
            ret.codaAttrib = dataCodaAttrib;
        }
        if (ch2.name === "segno") {
            let dataSegnoAttrib = getString(ch2, true);
            ret.segnoAttrib = dataSegnoAttrib;
        }
        if (ch2.name === "divisions") {
            let dataDivisions = getNumber(ch2, true);
            ret.divisions = dataDivisions;
        }
    }
    ret._class = "Barline";
    return ret;
}
/**
 * Bar-style contains style information. Choices are
 * regular, dotted, dashed, heavy, light-light,
 * light-heavy, heavy-light, heavy-heavy, tick (a
 * short stroke through the top line), short (a partial
 * barline between the 2nd and 4th lines), and none.
 */
var BarStyleType;
(function (BarStyleType) {
    BarStyleType[BarStyleType["Regular"] = 0] = "Regular";
    BarStyleType[BarStyleType["LightHeavy"] = 5] = "LightHeavy";
    BarStyleType[BarStyleType["HeavyLight"] = 6] = "HeavyLight";
    BarStyleType[BarStyleType["Short"] = 9] = "Short";
    BarStyleType[BarStyleType["None"] = 10] = "None";
    BarStyleType[BarStyleType["Dashed"] = 2] = "Dashed";
    BarStyleType[BarStyleType["HeavyHeavy"] = 7] = "HeavyHeavy";
    BarStyleType[BarStyleType["Tick"] = 8] = "Tick";
    BarStyleType[BarStyleType["Dotted"] = 1] = "Dotted";
    BarStyleType[BarStyleType["Heavy"] = 3] = "Heavy";
    BarStyleType[BarStyleType["LightLight"] = 4] = "LightLight";
})(BarStyleType || (exports.BarStyleType = BarStyleType = {}));
function getBarStyleType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "regular") {
        return BarStyleType.Regular;
    }
    if (s == "light-heavy") {
        return BarStyleType.LightHeavy;
    }
    if (s == "heavy-light") {
        return BarStyleType.HeavyLight;
    }
    if (s == "short") {
        return BarStyleType.Short;
    }
    if (s == "none") {
        return BarStyleType.None;
    }
    if (s == "dashed") {
        return BarStyleType.Dashed;
    }
    if (s == "heavy-heavy") {
        return BarStyleType.HeavyHeavy;
    }
    if (s == "tick") {
        return BarStyleType.Tick;
    }
    if (s == "dotted") {
        return BarStyleType.Dotted;
    }
    if (s == "heavy") {
        return BarStyleType.Heavy;
    }
    if (s == "light-light") {
        return BarStyleType.LightLight;
    }
    return fallbackVal;
}
function xmlToBarStyle(node) {
    let ret = {};
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getBarStyleType(ch3, null);
    ret.data = dataData;
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var StartStopDiscontinue;
(function (StartStopDiscontinue) {
    StartStopDiscontinue[StartStopDiscontinue["Discontinue"] = 2] = "Discontinue";
    StartStopDiscontinue[StartStopDiscontinue["Start"] = 0] = "Start";
    StartStopDiscontinue[StartStopDiscontinue["Stop"] = 1] = "Stop";
})(StartStopDiscontinue || (exports.StartStopDiscontinue = StartStopDiscontinue = {}));
function getStartStopDiscontinue(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "discontinue") {
        return StartStopDiscontinue.Discontinue;
    }
    if (s == "start") {
        return StartStopDiscontinue.Start;
    }
    if (s == "stop") {
        return StartStopDiscontinue.Stop;
    }
    return fallbackVal;
}
function xmlToEnding(node) {
    let ret = {};
    let foundPrintObject = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "end-length") {
            let dataEndLength = getNumber(ch2, true);
            ret.endLength = dataEndLength;
        }
        if (ch2.name === "text-x") {
            let dataTextX = getNumber(ch2, true);
            ret.textX = dataTextX;
        }
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "text-y") {
            let dataTextY = getNumber(ch2, true);
            ret.textY = dataTextY;
        }
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStopDiscontinue(ch2, null);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataEnding = getString(ch3, false);
    ret.ending = dataEnding;
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var WingedType;
(function (WingedType) {
    WingedType[WingedType["None"] = 0] = "None";
    WingedType[WingedType["Curved"] = 2] = "Curved";
    WingedType[WingedType["DoubleCurved"] = 4] = "DoubleCurved";
    WingedType[WingedType["Straight"] = 1] = "Straight";
    WingedType[WingedType["DoubleStraight"] = 3] = "DoubleStraight";
})(WingedType || (exports.WingedType = WingedType = {}));
function getWingedType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return WingedType.None;
    }
    if (s == "curved") {
        return WingedType.Curved;
    }
    if (s == "double-curved") {
        return WingedType.DoubleCurved;
    }
    if (s == "straight") {
        return WingedType.Straight;
    }
    if (s == "double-straight") {
        return WingedType.DoubleStraight;
    }
    return fallbackVal;
}
var DirectionTypeBg;
(function (DirectionTypeBg) {
    DirectionTypeBg[DirectionTypeBg["Forward"] = 1] = "Forward";
    DirectionTypeBg[DirectionTypeBg["Backward"] = 0] = "Backward";
})(DirectionTypeBg || (exports.DirectionTypeBg = DirectionTypeBg = {}));
function getDirectionTypeBg(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "forward") {
        return DirectionTypeBg.Forward;
    }
    if (s == "backward") {
        return DirectionTypeBg.Backward;
    }
    return fallbackVal;
}
function xmlToRepeat(node) {
    let ret = {};
    let foundWinged = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "times") {
            let dataTimes = getString(ch2, true);
            ret.times = dataTimes;
        }
        if (ch2.name === "winged") {
            let dataWinged = getWingedType(ch2, WingedType.None);
            ret.winged = dataWinged;
            foundWinged = true;
        }
        if (ch2.name === "direction") {
            let dataDirection = getDirectionTypeBg(ch2, null);
            ret.direction = dataDirection;
        }
    }
    if (!foundWinged) {
        ret.winged = WingedType.None;
    }
    return ret;
}
/**
 * The tip-direction entity represents the direction in which
 * the tip of a stick or beater points, using Unicode arrow
 * terminology.
 */
var TipDirection;
(function (TipDirection) {
    TipDirection[TipDirection["Right"] = 3] = "Right";
    TipDirection[TipDirection["Northwest"] = 4] = "Northwest";
    TipDirection[TipDirection["Southwest"] = 7] = "Southwest";
    TipDirection[TipDirection["Down"] = 1] = "Down";
    TipDirection[TipDirection["Northeast"] = 5] = "Northeast";
    TipDirection[TipDirection["Southeast"] = 6] = "Southeast";
    TipDirection[TipDirection["Up"] = 0] = "Up";
    TipDirection[TipDirection["Left"] = 2] = "Left";
})(TipDirection || (exports.TipDirection = TipDirection = {}));
function getTipDirection(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "right") {
        return TipDirection.Right;
    }
    if (s == "northwest") {
        return TipDirection.Northwest;
    }
    if (s == "southwest") {
        return TipDirection.Southwest;
    }
    if (s == "down") {
        return TipDirection.Down;
    }
    if (s == "northeast") {
        return TipDirection.Northeast;
    }
    if (s == "southeast") {
        return TipDirection.Southeast;
    }
    if (s == "up") {
        return TipDirection.Up;
    }
    if (s == "left") {
        return TipDirection.Left;
    }
    return fallbackVal;
}
function xmlToDirection(node) {
    let ret = {};
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "voice") {
            let dataVoice = getNumber(ch, true);
            ret.voice = dataVoice;
        }
        if (ch.nodeName === "footnote") {
            let dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            let dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "direction-type") {
            let dataDirectionTypes = xmlToDirectionType(ch);
            ret.directionTypes = (ret.directionTypes || []).concat(dataDirectionTypes);
        }
        if (ch.nodeName === "staff") {
            let dataStaff = getNumber(ch, true);
            ret.staff = dataStaff;
        }
        if (ch.nodeName === "offset") {
            let dataOffset = xmlToOffset(ch);
            ret.offset = dataOffset;
        }
        if (ch.nodeName === "sound") {
            let dataSound = xmlToSound(ch);
            ret.sound = dataSound;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "directive") {
            let dataDirective = xmlToYesNo(ch2);
            ret.directive = dataDirective;
        }
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    ret._class = "Direction";
    return ret;
}
function xmlToDirectionType(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "percussion") {
            let dataPercussions = xmlToPercussion(ch);
            ret.percussions = (ret.percussions || []).concat(dataPercussions);
        }
        if (ch.nodeName === "rehearsal") {
            let dataRehearsals = xmlToRehearsal(ch);
            ret.rehearsals = (ret.rehearsals || []).concat(dataRehearsals);
        }
        if (ch.nodeName === "pedal") {
            let dataPedal = xmlToPedal(ch);
            ret.pedal = dataPedal;
        }
        if (ch.nodeName === "principal-voice") {
            let dataPrincipalVoice = xmlToPrincipalVoice(ch);
            ret.principalVoice = dataPrincipalVoice;
        }
        if (ch.nodeName === "accordion-registration") {
            let dataAccordionRegistration = xmlToAccordionRegistration(ch);
            ret.accordionRegistration = dataAccordionRegistration;
        }
        if (ch.nodeName === "eyeglasses") {
            let dataEyeglasses = xmlToEyeglasses(ch);
            ret.eyeglasses = dataEyeglasses;
        }
        if (ch.nodeName === "image") {
            let dataImage = xmlToImage(ch);
            ret.image = dataImage;
        }
        if (ch.nodeName === "harp-pedals") {
            let dataHarpPedals = xmlToHarpPedals(ch);
            ret.harpPedals = dataHarpPedals;
        }
        if (ch.nodeName === "metronome") {
            let dataMetronome = xmlToMetronome(ch);
            ret.metronome = dataMetronome;
        }
        if (ch.nodeName === "other-direction") {
            let dataOtherDirection = xmlToOtherDirection(ch);
            ret.otherDirection = dataOtherDirection;
        }
        if (ch.nodeName === "segno") {
            let dataSegnos = xmlToSegno(ch);
            ret.segnos = (ret.segnos || []).concat(dataSegnos);
        }
        if (ch.nodeName === "scordatura") {
            let dataScordatura = xmlToScordatura(ch);
            ret.scordatura = dataScordatura;
        }
        if (ch.nodeName === "string-mute") {
            let dataStringMute = xmlToStringMute(ch);
            ret.stringMute = dataStringMute;
        }
        if (ch.nodeName === "wedge") {
            let dataWedge = xmlToWedge(ch);
            ret.wedge = dataWedge;
        }
        if (ch.nodeName === "dashes") {
            let dataDashes = xmlToDashes(ch);
            ret.dashes = dataDashes;
        }
        if (ch.nodeName === "damp") {
            let dataDamp = xmlToDamp(ch);
            ret.damp = dataDamp;
        }
        if (ch.nodeName === "bracket") {
            let dataBracket = xmlToBracket(ch);
            ret.bracket = dataBracket;
        }
        if (ch.nodeName === "dynamics") {
            let dataDynamics = xmlToDynamics(ch);
            ret.dynamics = dataDynamics;
        }
        if (ch.nodeName === "octave-shift") {
            let dataOctaveShift = xmlToOctaveShift(ch);
            ret.octaveShift = dataOctaveShift;
        }
        if (ch.nodeName === "words") {
            let dataWords = xmlToWords(ch);
            ret.words = (ret.words || []).concat(dataWords);
        }
        if (ch.nodeName === "damp-all") {
            let dataDampAll = xmlToDampAll(ch);
            ret.dampAll = dataDampAll;
        }
        if (ch.nodeName === "coda") {
            let dataCodas = xmlToCoda(ch);
            ret.codas = (ret.codas || []).concat(dataCodas);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToRehearsal(node) {
    let ret = {};
    let foundJustify = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    let foundUnderline = false;
    let foundOverline = false;
    let foundLineThrough = false;
    let foundRotation = false;
    let foundLetterSpacing = false;
    let foundLineHeight = false;
    let foundDir = false;
    let foundEnclosure = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            let dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            let dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            let dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            let dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            let dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            let dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            let dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            let dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToWords(node) {
    let ret = {};
    let foundJustify = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    let foundUnderline = false;
    let foundOverline = false;
    let foundLineThrough = false;
    let foundRotation = false;
    let foundLetterSpacing = false;
    let foundLineHeight = false;
    let foundDir = false;
    let foundEnclosure = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            let dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            let dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            let dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            let dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            let dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            let dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            let dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            let dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
var WedgeType;
(function (WedgeType) {
    WedgeType[WedgeType["Diminuendo"] = 1] = "Diminuendo";
    WedgeType[WedgeType["Crescendo"] = 0] = "Crescendo";
    WedgeType[WedgeType["Stop"] = 2] = "Stop";
    WedgeType[WedgeType["Continue"] = 3] = "Continue";
})(WedgeType || (exports.WedgeType = WedgeType = {}));
function getWedgeType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "diminuendo") {
        return WedgeType.Diminuendo;
    }
    if (s == "crescendo") {
        return WedgeType.Crescendo;
    }
    if (s == "stop") {
        return WedgeType.Stop;
    }
    if (s == "continue") {
        return WedgeType.Continue;
    }
    return fallbackVal;
}
function xmlToWedge(node) {
    let ret = {};
    let foundNumber_ = false;
    let foundNiente = false;
    let foundLineType = false;
    let foundDashLength = false;
    let foundSpaceLength = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "niente") {
            let dataNiente = xmlToYesNo(ch2);
            ret.niente = dataNiente;
            foundNiente = true;
        }
        if (ch2.name === "line-type") {
            let dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            let dataType = getWedgeType(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "spread") {
            let dataSpread = getNumber(ch2, true);
            ret.spread = dataSpread;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundNiente) {
        ret.niente = false;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToDashes(node) {
    let ret = {};
    let foundNumber_ = false;
    let foundDashLength = false;
    let foundSpaceLength = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStopContinue(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var LineEndType;
(function (LineEndType) {
    LineEndType[LineEndType["None"] = 4] = "None";
    LineEndType[LineEndType["Both"] = 2] = "Both";
    LineEndType[LineEndType["Arrow"] = 3] = "Arrow";
    LineEndType[LineEndType["Down"] = 1] = "Down";
    LineEndType[LineEndType["Up"] = 0] = "Up";
})(LineEndType || (exports.LineEndType = LineEndType = {}));
function getLineEndType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return LineEndType.None;
    }
    if (s == "both") {
        return LineEndType.Both;
    }
    if (s == "arrow") {
        return LineEndType.Arrow;
    }
    if (s == "down") {
        return LineEndType.Down;
    }
    if (s == "up") {
        return LineEndType.Up;
    }
    return fallbackVal;
}
function xmlToBracket(node) {
    let ret = {};
    let foundNumber_ = false;
    let foundLineType = false;
    let foundDashLength = false;
    let foundSpaceLength = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "end-length") {
            let dataEndLength = getNumber(ch2, true);
            ret.endLength = dataEndLength;
        }
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "line-type") {
            let dataLineType = getSolidDashedDottedWavy(ch2, SolidDashedDottedWavy.Solid);
            ret.lineType = dataLineType;
            foundLineType = true;
        }
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStopContinue(ch2, null);
            ret.type = dataType;
        }
        if (ch2.name === "line-end") {
            let dataLineEnd = getLineEndType(ch2, null);
            ret.lineEnd = dataLineEnd;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    if (!foundLineType) {
        ret.lineType = SolidDashedDottedWavy.Solid;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
var PedalType;
(function (PedalType) {
    PedalType[PedalType["Change"] = 3] = "Change";
    PedalType[PedalType["Start"] = 0] = "Start";
    PedalType[PedalType["Stop"] = 1] = "Stop";
    PedalType[PedalType["Continue"] = 2] = "Continue";
})(PedalType || (exports.PedalType = PedalType = {}));
function getPedalType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "change") {
        return PedalType.Change;
    }
    if (s == "start") {
        return PedalType.Start;
    }
    if (s == "stop") {
        return PedalType.Stop;
    }
    if (s == "continue") {
        return PedalType.Continue;
    }
    return fallbackVal;
}
function xmlToPedal(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "line") {
            let dataLine = xmlToYesNo(ch2);
            ret.line = dataLine;
        }
        if (ch2.name === "sign") {
            let dataSign = xmlToYesNo(ch2);
            ret.sign = dataSign;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "type") {
            let dataType = getPedalType(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToMetronome(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    let foundJustify = false;
    let gotFirstPair = false;
    let gotSecondPair = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "metronome-note") {
            let dataMetronomeNotes = xmlToMetronomeNote(ch);
            ret.metronomeNotes = (ret.metronomeNotes || []).concat(dataMetronomeNotes);
        }
        if (ch.nodeName === "per-minute") {
            let dataPerMinute = xmlToPerMinute(ch);
            ret.perMinute = dataPerMinute;
        }
        if (ch.nodeName === "beat-unit") {
            let dataBeatUnit = getString(ch, true);
            if (!gotFirstPair) {
                ret.beatUnit = dataBeatUnit;
                gotFirstPair = true;
            }
            else if (!gotSecondPair) {
                ret.beatUnitChange = dataBeatUnit;
                gotSecondPair = true;
            }
            else {
                throw "Too many beat-units in metronome";
            }
        }
        if (ch.nodeName === "beat-unit-dot") {
            let dataBeatUnitDots = xmlToBeatUnitDot(ch);
            if (!gotSecondPair) {
                ret.beatUnitDots = (ret.beatUnitDots || []).concat(dataBeatUnitDots);
            }
            else {
                ret.beatUnitDotsChange = (ret.beatUnitDotsChange || []).concat(dataBeatUnitDots);
            }
        }
        if (ch.nodeName === "metronome-relation") {
            let dataMetronomeRelation = getString(ch, true);
            ret.metronomeRelation = dataMetronomeRelation;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "parentheses") {
            let dataParentheses = xmlToYesNo(ch2);
            ret.parentheses = dataParentheses;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    return ret;
}
function xmlToBeatUnitDot(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToPerMinute(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    return ret;
}
function xmlToMetronomeNote(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "metronome-dot") {
            let dataMetronomeDots = xmlToMetronomeDot(ch);
            ret.metronomeDots = (ret.metronomeDots || []).concat(dataMetronomeDots);
        }
        if (ch.nodeName === "metronome-beam") {
            let dataMetronomeBeams = xmlToMetronomeBeam(ch);
            ret.metronomeBeams = (ret.metronomeBeams || []).concat(dataMetronomeBeams);
        }
        if (ch.nodeName === "metronome-type") {
            let dataMetronomeType = getString(ch, true);
            ret.metronomeType = dataMetronomeType;
        }
        if (ch.nodeName === "metronome-tuplet") {
            let dataMetronomeTuplet = xmlToMetronomeTuplet(ch);
            ret.metronomeTuplet = dataMetronomeTuplet;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToMetronomeDot(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToMetronomeBeam(node) {
    let ret = {};
    let foundNumber_ = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundNumber_) {
        ret.number = 1;
    }
    return ret;
}
function xmlToMetronomeTuplet(node) {
    let ret = {};
    let foundBracket = false;
    let foundShowNumber = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "actual-notes") {
            let dataActualNotes = getNumber(ch, true);
            ret.actualNotes = dataActualNotes;
        }
        if (ch.nodeName === "normal-type") {
            let dataNormalType = getString(ch, true);
            ret.normalType = dataNormalType;
        }
        if (ch.nodeName === "normal-notes") {
            let dataNormalNotes = getNumber(ch, true);
            ret.normalNotes = dataNormalNotes;
        }
        if (ch.nodeName === "normal-dot") {
            let dataNormalDots = xmlToNormalDot(ch);
            ret.normalDots = (ret.normalDots || []).concat(dataNormalDots);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "bracket") {
            let dataBracket = xmlToYesNo(ch2);
            ret.bracket = dataBracket;
            foundBracket = true;
        }
        if (ch2.name === "show-number") {
            let dataShowNumber = getActualBothNone(ch2, ActualBothNone.Both);
            ret.showNumber = dataShowNumber;
            foundShowNumber = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundBracket) {
        ret.bracket = false;
    }
    if (!foundShowNumber) {
        ret.showNumber = ActualBothNone.Both;
    }
    return ret;
}
var OctaveShiftType;
(function (OctaveShiftType) {
    OctaveShiftType[OctaveShiftType["Down"] = 2] = "Down";
    OctaveShiftType[OctaveShiftType["Stop"] = 3] = "Stop";
    OctaveShiftType[OctaveShiftType["Up"] = 1] = "Up";
    OctaveShiftType[OctaveShiftType["Continue"] = 4] = "Continue";
})(OctaveShiftType || (exports.OctaveShiftType = OctaveShiftType = {}));
function getOctaveShiftType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "down") {
        return OctaveShiftType.Down;
    }
    if (s == "stop") {
        return OctaveShiftType.Stop;
    }
    if (s == "up") {
        return OctaveShiftType.Up;
    }
    if (s == "continue") {
        return OctaveShiftType.Continue;
    }
    return fallbackVal;
}
function xmlToOctaveShift(node) {
    let ret = {};
    let foundSize = false;
    let foundDashLength = false;
    let foundSpaceLength = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "size") {
            let dataSize = getNumber(ch2, true);
            ret.size = dataSize;
            foundSize = true;
        }
        if (ch2.name === "dash-length") {
            let dataDashLength = getNumber(ch2, true);
            ret.dashLength = dataDashLength;
            foundDashLength = true;
        }
        if (ch2.name === "space-length") {
            let dataSpaceLength = getNumber(ch2, true);
            ret.spaceLength = dataSpaceLength;
            foundSpaceLength = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            let dataType = getOctaveShiftType(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundSize) {
        ret.size = 8;
    }
    if (!foundDashLength) {
        ret.dashLength = 1;
    }
    if (!foundSpaceLength) {
        ret.spaceLength = 1;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToHarpPedals(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "pedal-tuning") {
            let dataPedalTunings = xmlToPedalTuning(ch);
            ret.pedalTunings = (ret.pedalTunings || []).concat(dataPedalTunings);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToPedalTuning(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "pedal-step") {
            let dataPedalStep = getString(ch, true);
            ret.pedalStep = dataPedalStep;
        }
        if (ch.nodeName === "pedal-alter") {
            let dataPedalAlter = getString(ch, true);
            ret.pedalAlter = dataPedalAlter;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToDamp(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToDampAll(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToEyeglasses(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToStringMute(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "type") {
            let dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToScordatura(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "accord") {
            let dataAccords = xmlToAccord(ch);
            ret.accords = (ret.accords || []).concat(dataAccords);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToAccord(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "tuning-alter") {
            let dataTuningAlter = getString(ch, true);
            ret.tuningAlter = dataTuningAlter;
        }
        if (ch.nodeName === "tuning-step") {
            let dataTuningStep = getString(ch, true);
            ret.tuningStep = dataTuningStep;
        }
        if (ch.nodeName === "tuning-octave") {
            let dataTuningOctave = getString(ch, true);
            ret.tuningOctave = dataTuningOctave;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "string") {
            let dataString = getString(ch2, true);
            ret.string = dataString;
        }
    }
    return ret;
}
function xmlToImage(node) {
    let ret = {};
    let foundHalign = false;
    let foundValignImage = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValignImage = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valignImage = dataValignImage;
            foundValignImage = true;
        }
        if (ch2.name === "type") {
            let dataType = getString(ch2, true);
            ret.type = dataType;
        }
        if (ch2.name === "source") {
            let dataSource = getString(ch2, true);
            ret.source = dataSource;
        }
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValignImage) {
        ret.valignImage = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
var VoiceSymbol;
(function (VoiceSymbol) {
    VoiceSymbol[VoiceSymbol["None"] = 4] = "None";
    VoiceSymbol[VoiceSymbol["Hauptstimme"] = 1] = "Hauptstimme";
    VoiceSymbol[VoiceSymbol["Nebenstimme"] = 2] = "Nebenstimme";
    VoiceSymbol[VoiceSymbol["Plain"] = 3] = "Plain";
})(VoiceSymbol || (exports.VoiceSymbol = VoiceSymbol = {}));
function getVoiceSymbol(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "none") {
        return VoiceSymbol.None;
    }
    if (s == "Hauptstimme") {
        return VoiceSymbol.Hauptstimme;
    }
    if (s == "Nebenstimme") {
        return VoiceSymbol.Nebenstimme;
    }
    if (s == "plain") {
        return VoiceSymbol.Plain;
    }
    return fallbackVal;
}
function xmlToPrincipalVoice(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "symbol") {
            let dataSymbol = getVoiceSymbol(ch2, null);
            ret.symbol = dataSymbol;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, false);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToAccordionRegistration(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "accordion-middle") {
            let dataAccordionMiddle = getString(ch, true);
            ret.accordionMiddle = dataAccordionMiddle;
        }
        if (ch.nodeName === "accordion-high") {
            let dataAccordionHigh = true;
            ret.accordionHigh = dataAccordionHigh;
        }
        if (ch.nodeName === "accordion-low") {
            let dataAccordionLow = true;
            ret.accordionLow = dataAccordionLow;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToPercussion(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    let foundEnclosure = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "stick-location") {
            let dataStickLocation = getString(ch, true);
            ret.stickLocation = dataStickLocation;
        }
        if (ch.nodeName === "other-percussion") {
            let dataOtherPercussion = getString(ch, true);
            ret.otherPercussion = dataOtherPercussion;
        }
        if (ch.nodeName === "wood") {
            let dataWood = getString(ch, true);
            ret.wood = dataWood;
        }
        if (ch.nodeName === "effect") {
            let dataEffect = getString(ch, true);
            ret.effect = dataEffect;
        }
        if (ch.nodeName === "glass") {
            let dataGlass = getString(ch, true);
            ret.glass = dataGlass;
        }
        if (ch.nodeName === "timpani") {
            let dataTimpani = xmlToTimpani(ch);
            ret.timpani = dataTimpani;
        }
        if (ch.nodeName === "stick") {
            let dataStick = xmlToStick(ch);
            ret.stick = dataStick;
        }
        if (ch.nodeName === "metal") {
            let dataMetal = getString(ch, true);
            ret.metal = dataMetal;
        }
        if (ch.nodeName === "pitched") {
            let dataPitched = getString(ch, true);
            ret.pitched = dataPitched;
        }
        if (ch.nodeName === "membrane") {
            let dataMembrane = getString(ch, true);
            ret.membrane = dataMembrane;
        }
        if (ch.nodeName === "beater") {
            let dataBeater = xmlToBeater(ch);
            ret.beater = dataBeater;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "enclosure") {
            let dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    return ret;
}
function xmlToTimpani(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToBeater(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "tip") {
            let dataTip = getTipDirection(ch2, null);
            ret.tip = dataTip;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    return ret;
}
function xmlToStick(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "stick-material") {
            let dataStickMaterial = getString(ch, true);
            ret.stickMaterial = dataStickMaterial;
        }
        if (ch.nodeName === "stick-type") {
            let dataStickType = getString(ch, true);
            ret.stickType = dataStickType;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "tip") {
            let dataTip = getTipDirection(ch2, null);
            ret.tip = dataTip;
        }
    }
    return ret;
}
function xmlToOffset(node) {
    let ret = {};
    let foundSound = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "sound") {
            let dataSound = xmlToYesNo(ch2);
            ret.sound = dataSound;
            foundSound = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundSound) {
        ret.sound = false;
    }
    return ret;
}
function xmlToHarmonyChord(node) {
    let ret = {
        root: null,
        function: null,
        kind: null,
        degrees: [],
        inversion: null,
        bass: null,
    };
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "root") {
            let dataRoot = xmlToRoot(ch);
            ret.root = dataRoot;
        }
        if (ch.nodeName === "function") {
            let dataFunction = xmlToFunction(ch);
            ret.function = dataFunction;
        }
        if (ch.nodeName === "kind") {
            let dataKind = xmlToKind(ch);
            ret.kind = dataKind;
        }
        if (ch.nodeName === "degree") {
            let dataDegree = xmlToDegree(ch);
            ret.degrees.push(dataDegree);
        }
        if (ch.nodeName === "inversion") {
            let dataInversion = xmlToInversion(ch);
            ret.inversion = dataInversion;
        }
        if (ch.nodeName === "bass") {
            let dataBass = xmlToBass(ch);
            ret.bass = dataBass;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
var ExplicitImpliedAlternate;
(function (ExplicitImpliedAlternate) {
    ExplicitImpliedAlternate[ExplicitImpliedAlternate["Explicit"] = 1] = "Explicit";
    ExplicitImpliedAlternate[ExplicitImpliedAlternate["Implied"] = 2] = "Implied";
    ExplicitImpliedAlternate[ExplicitImpliedAlternate["Alternate"] = 3] = "Alternate";
})(ExplicitImpliedAlternate || (exports.ExplicitImpliedAlternate = ExplicitImpliedAlternate = {}));
function getExplicitImpliedAlternate(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "explicit") {
        return ExplicitImpliedAlternate.Explicit;
    }
    if (s == "implied") {
        return ExplicitImpliedAlternate.Implied;
    }
    if (s == "alternate") {
        return ExplicitImpliedAlternate.Alternate;
    }
    return fallbackVal;
}
function xmlToHarmony(node) {
    let ret = {
        frame: null,
        printFrame: null,
        staff: null,
        type: null,
        offset: null,
        root: null,
        function: null,
        kind: null,
        degrees: [],
        inversion: null,
        bass: null,
    };
    let foundPrintObject = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPlacement = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "frame") {
            let dataFrame = xmlToFrame(ch);
            ret.frame = dataFrame;
        }
        if (ch.nodeName === "root") {
            let dataRoot = xmlToRoot(ch);
            ret.root = dataRoot;
        }
        if (ch.nodeName === "function") {
            let dataFunction = xmlToFunction(ch);
            ret.function = dataFunction;
        }
        if (ch.nodeName === "kind") {
            let dataKind = xmlToKind(ch);
            ret.kind = dataKind;
        }
        if (ch.nodeName === "degree") {
            let dataDegree = xmlToDegree(ch);
            ret.degrees.push(dataDegree);
        }
        if (ch.nodeName === "inversion") {
            let dataInversion = xmlToInversion(ch);
            ret.inversion = dataInversion;
        }
        if (ch.nodeName === "bass") {
            let dataBass = xmlToBass(ch);
            ret.bass = dataBass;
        }
        if (ch.nodeName === "footnote") {
            let dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            let dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "staff") {
            let dataStaff = getNumber(ch, true);
            ret.staff = dataStaff;
        }
        if (ch.nodeName === "offset") {
            let dataOffset = xmlToOffset(ch);
            ret.offset = dataOffset;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "print-frame") {
            let dataPrintFrame = xmlToYesNo(ch2);
            ret.printFrame = dataPrintFrame;
        }
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "placement") {
            let dataPlacement = getAboveBelow(ch2, AboveBelow.Unspecified);
            ret.placement = dataPlacement;
            foundPlacement = true;
        }
        if (ch2.name === "type") {
            let dataHarmonyType = getExplicitImpliedAlternate(ch2, null);
            ret.type = dataHarmonyType;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPlacement) {
        ret.placement = AboveBelow.Unspecified;
    }
    ret._class = "Harmony";
    return ret;
}
function xmlToRoot(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "root-step") {
            let dataRootStep = xmlToRootStep(ch);
            ret.rootStep = dataRootStep;
        }
        if (ch.nodeName === "root-alter") {
            let dataRootAlter = xmlToRootAlter(ch);
            ret.rootAlter = dataRootAlter;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToRootStep(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "text") {
            let dataText = getString(ch2, true);
            ret.text = dataText;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToRootAlter(node) {
    let ret = {};
    let foundPrintObject = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "location") {
            let dataLocation = getLeftRight(ch2, null);
            ret.location = dataLocation;
        }
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToFunction(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToKind(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "parentheses-degrees") {
            let dataParenthesesDegrees = xmlToYesNo(ch2);
            ret.parenthesesDegrees = dataParenthesesDegrees;
        }
        if (ch2.name === "use-symbols") {
            let dataUseSymbols = xmlToYesNo(ch2);
            ret.useSymbols = dataUseSymbols;
        }
        if (ch2.name === "text") {
            let dataText = getString(ch2, true);
            ret.text = dataText;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "stack-degrees") {
            let dataStackDegrees = xmlToYesNo(ch2);
            ret.stackDegrees = dataStackDegrees;
        }
        if (ch2.name === "bracket-degrees") {
            let dataBracketDegrees = xmlToYesNo(ch2);
            ret.bracketDegrees = dataBracketDegrees;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToInversion(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToBass(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "bass-step") {
            let dataBassStep = xmlToBassStep(ch);
            ret.bassStep = dataBassStep;
        }
        if (ch.nodeName === "bass-alter") {
            let dataBassAlter = xmlToBassAlter(ch);
            ret.bassAlter = dataBassAlter;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToBassStep(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "text") {
            let dataText = getString(ch2, true);
            ret.text = dataText;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToBassAlter(node) {
    let ret = {};
    let foundPrintObject = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "location") {
            let dataLocation = getLeftRight(ch2, null);
            ret.location = dataLocation;
        }
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToDegree(node) {
    let ret = {};
    let foundPrintObject = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "degree-alter") {
            let dataDegreeAlter = xmlToDegreeAlter(ch);
            ret.degreeAlter = dataDegreeAlter;
        }
        if (ch.nodeName === "degree-value") {
            let dataDegreeValue = xmlToDegreeValue(ch);
            ret.degreeValue = dataDegreeValue;
        }
        if (ch.nodeName === "degree-type") {
            let dataDegreeType = xmlToDegreeType(ch);
            ret.degreeType = dataDegreeType;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    return ret;
}
var ChordType;
(function (ChordType) {
    ChordType[ChordType["Augmented"] = 3] = "Augmented";
    ChordType[ChordType["Diminished"] = 4] = "Diminished";
    ChordType[ChordType["Major"] = 1] = "Major";
    ChordType[ChordType["Minor"] = 2] = "Minor";
    ChordType[ChordType["HalfDiminished"] = 5] = "HalfDiminished";
})(ChordType || (exports.ChordType = ChordType = {}));
function getChordType(node, fallbackVal) {
    "use strict";
    let s = (node.nodeType === node.ATTRIBUTE_NODE
        ? node.value
        : node.textContent).trim();
    if (s === "" && fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
    }
    if (s == "augmented") {
        return ChordType.Augmented;
    }
    if (s == "diminished") {
        return ChordType.Diminished;
    }
    if (s == "major") {
        return ChordType.Major;
    }
    if (s == "minor") {
        return ChordType.Minor;
    }
    if (s == "half-diminished") {
        return ChordType.HalfDiminished;
    }
    return fallbackVal;
}
function xmlToDegreeValue(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "symbol") {
            let dataSymbol = getChordType(ch2, null);
            ret.symbol = dataSymbol;
        }
        if (ch2.name === "text") {
            let dataText = getString(ch2, true);
            ret.text = dataText;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToDegreeAlter(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "plus-minus") {
            let dataPlusMinus = xmlToYesNo(ch2);
            ret.plusMinus = dataPlusMinus;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToDegreeType(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "text") {
            let dataText = getString(ch2, true);
            ret.text = dataText;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToFrame(node) {
    let ret = {};
    let foundColor = false;
    let foundHalign = false;
    let foundValignImage = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "frame-strings") {
            let dataFrameStrings = getString(ch, true);
            ret.frameStrings = dataFrameStrings;
        }
        if (ch.nodeName === "frame-note") {
            let dataFrameNotes = xmlToFrameNote(ch);
            ret.frameNotes = (ret.frameNotes || []).concat(dataFrameNotes);
        }
        if (ch.nodeName === "frame-frets") {
            let dataFrameFrets = getString(ch, true);
            ret.frameFrets = dataFrameFrets;
        }
        if (ch.nodeName === "first-fret") {
            let dataFirstFret = xmlToFirstFret(ch);
            ret.firstFret = dataFirstFret;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "unplayed") {
            let dataUnplayed = getString(ch2, true);
            ret.unplayed = dataUnplayed;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValignImage = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valignImage = dataValignImage;
            foundValignImage = true;
        }
        if (ch2.name === "width") {
            let dataWidth = getNumber(ch2, true);
            ret.width = dataWidth;
        }
        if (ch2.name === "height") {
            let dataHeight = getNumber(ch2, true);
            ret.height = dataHeight;
        }
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValignImage) {
        ret.valignImage = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToFirstFret(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "text") {
            let dataText = getString(ch2, true);
            ret.text = dataText;
        }
        if (ch2.name === "location") {
            let dataLocation = getLeftRight(ch2, null);
            ret.location = dataLocation;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    return ret;
}
function xmlToFrameNote(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "barre") {
            let dataBarre = xmlToBarre(ch);
            ret.barre = dataBarre;
        }
        if (ch.nodeName === "string") {
            let dataString = xmlToString(ch);
            ret.string = dataString;
        }
        if (ch.nodeName === "fingering") {
            let dataFingering = xmlToFingering(ch);
            ret.fingering = dataFingering;
        }
        if (ch.nodeName === "fret") {
            let dataFret = xmlToFret(ch);
            ret.fret = dataFret;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToBarre(node) {
    let ret = {};
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToGrouping(node) {
    let ret = {};
    let foundNumber_ = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "feature") {
            let dataFeatures = xmlToFeature(ch);
            ret.features = (ret.features || []).concat(dataFeatures);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "type") {
            let dataGroupingType = getStartStopSingle(ch2, null);
            ret.type = dataGroupingType;
        }
        if (ch2.name === "member-of") {
            let dataMemberOf = getString(ch2, true);
            ret.memberOf = dataMemberOf;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    ret._class = "Grouping";
    return ret;
}
function xmlToFeature(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "type") {
            let dataType = getString(ch2, true);
            ret.type = dataType;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    return ret;
}
function xmlToPrint(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "measure-numbering") {
            let dataMeasureNumbering = xmlToMeasureNumbering(ch);
            ret.measureNumbering = dataMeasureNumbering;
        }
        if (ch.nodeName === "part-name-display") {
            let dataPartNameDisplay = xmlToPartNameDisplay(ch);
            ret.partNameDisplay = dataPartNameDisplay;
        }
        if (ch.nodeName === "measure-layout") {
            let dataMeasureLayout = xmlToMeasureLayout(ch);
            ret.measureLayout = dataMeasureLayout;
        }
        if (ch.nodeName === "part-abbreviation-display") {
            let dataPartAbbreviationDisplay = xmlToPartAbbreviationDisplay(ch);
            ret.partAbbreviationDisplay = dataPartAbbreviationDisplay;
        }
        if (ch.nodeName === "page-layout") {
            let dataPageLayout = xmlToPageLayout(ch);
            ret.pageLayout = dataPageLayout;
        }
        if (ch.nodeName === "system-layout") {
            let dataSystemLayout = xmlToSystemLayout(ch);
            ret.systemLayout = dataSystemLayout;
        }
        if (ch.nodeName === "staff-layout") {
            let dataStaffLayouts = xmlToStaffLayout(ch);
            ret.staffLayouts = (ret.staffLayouts || []).concat(dataStaffLayouts);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "new-system") {
            let dataNewSystem = xmlToYesNo(ch2);
            ret.newSystem = dataNewSystem;
        }
        if (ch2.name === "new-page") {
            let dataNewPage = xmlToYesNo(ch2);
            ret.newPage = dataNewPage;
        }
        if (ch2.name === "blank-page") {
            let dataBlankPage = getString(ch2, true);
            ret.blankPage = dataBlankPage;
        }
        if (ch2.name === "staff-spacing") {
            let dataStaffSpacing = getNumber(ch2, true);
            ret.staffSpacing = dataStaffSpacing;
        }
        if (ch2.name === "page-number") {
            let dataPageNumber = getString(ch2, true);
            ret.pageNumber = dataPageNumber;
        }
    }
    ret._class = "Print";
    return ret;
}
function xmlToMeasureNumbering(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToSound(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "midi-instrument") {
            let dataMidiInstruments = xmlToMidiInstrument(ch);
            ret.midiInstruments = (ret.midiInstruments || []).concat(dataMidiInstruments);
        }
        if (ch.nodeName === "play") {
            let dataPlays = xmlToPlay(ch);
            ret.plays = (ret.plays || []).concat(dataPlays);
        }
        if (ch.nodeName === "offset") {
            let dataOffset = xmlToOffset(ch);
            ret.offset = dataOffset;
        }
        if (ch.nodeName === "midi-device") {
            let dataMidiDevices = xmlToMidiDevice(ch);
            ret.midiDevices = (ret.midiDevices || []).concat(dataMidiDevices);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "soft-pedal") {
            let dataSoftPedal = getString(ch2, true);
            ret.softPedal = dataSoftPedal;
        }
        if (ch2.name === "pan") {
            let dataPan = getString(ch2, true);
            ret.pan = dataPan;
        }
        if (ch2.name === "tocoda") {
            let dataTocoda = getString(ch2, true);
            ret.tocoda = dataTocoda;
        }
        if (ch2.name === "decapo") {
            let dataDecapo = xmlToYesNo(ch2);
            ret.decapo = dataDecapo;
        }
        if (ch2.name === "divisions") {
            let dataDivisions = getNumber(ch2, true);
            ret.divisions = dataDivisions;
        }
        if (ch2.name === "pizzicato") {
            let dataPizzicato = xmlToYesNo(ch2);
            ret.pizzicato = dataPizzicato;
        }
        if (ch2.name === "coda") {
            let dataCoda = getString(ch2, true);
            ret.coda = dataCoda;
        }
        if (ch2.name === "segno") {
            let dataSegno = getString(ch2, true);
            ret.segno = dataSegno;
        }
        if (ch2.name === "elevation") {
            let dataElevation = getString(ch2, true);
            ret.elevation = dataElevation;
        }
        if (ch2.name === "fine") {
            let dataFine = getString(ch2, true);
            ret.fine = dataFine;
        }
        if (ch2.name === "damper-pedal") {
            let dataDamperPedal = getString(ch2, true);
            ret.damperPedal = dataDamperPedal;
        }
        if (ch2.name === "dynamics") {
            let dataDynamics = getString(ch2, true);
            ret.dynamics = dataDynamics;
        }
        if (ch2.name === "time-only") {
            let dataTimeOnly = getString(ch2, true);
            ret.timeOnly = dataTimeOnly;
        }
        if (ch2.name === "sostenuto-pedal") {
            let dataSostenutoPedal = getString(ch2, true);
            ret.sostenutoPedal = dataSostenutoPedal;
        }
        if (ch2.name === "dalsegno") {
            let dataDalsegno = getString(ch2, true);
            ret.dalsegno = dataDalsegno;
        }
        if (ch2.name === "tempo") {
            let dataTempo = getString(ch2, true);
            ret.tempo = dataTempo;
        }
        if (ch2.name === "forward-repeat") {
            let dataForwardRepeat = xmlToYesNo(ch2);
            ret.forwardRepeat = dataForwardRepeat;
        }
    }
    ret._class = "Sound";
    return ret;
}
function xmlToWork(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "work-number") {
            let dataWorkNumber = getString(ch, true);
            ret.workNumber = dataWorkNumber;
        }
        if (ch.nodeName === "work-title") {
            let dataWorkTitle = getString(ch, true);
            ret.workTitle = dataWorkTitle;
        }
        if (ch.nodeName === "opus") {
            let dataOpus = xmlToOpus(ch);
            ret.opus = dataOpus;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToOpus(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToDefaults(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "word-font") {
            let dataWordFont = xmlToWordFont(ch);
            ret.wordFont = dataWordFont;
        }
        if (ch.nodeName === "lyric-language") {
            let dataLyricLanguages = xmlToLyricLanguage(ch);
            ret.lyricLanguages = (ret.lyricLanguages || []).concat(dataLyricLanguages);
        }
        if (ch.nodeName === "lyric-font") {
            let dataLyricFonts = xmlToLyricFont(ch);
            ret.lyricFonts = (ret.lyricFonts || []).concat(dataLyricFonts);
        }
        if (ch.nodeName === "page-layout") {
            let dataPageLayout = xmlToPageLayout(ch);
            ret.pageLayout = dataPageLayout;
        }
        if (ch.nodeName === "system-layout") {
            let dataSystemLayout = xmlToSystemLayout(ch);
            ret.systemLayout = dataSystemLayout;
        }
        if (ch.nodeName === "appearance") {
            let dataAppearance = xmlToAppearance(ch);
            ret.appearance = dataAppearance;
        }
        if (ch.nodeName === "scaling") {
            let dataScaling = xmlToScaling(ch);
            ret.scaling = dataScaling;
        }
        if (ch.nodeName === "staff-layout") {
            let dataStaffLayouts = xmlToStaffLayout(ch);
            ret.staffLayouts = (ret.staffLayouts || []).concat(dataStaffLayouts);
        }
        if (ch.nodeName === "music-font") {
            let dataMusicFont = xmlToMusicFont(ch);
            ret.musicFont = dataMusicFont;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToMusicFont(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    return ret;
}
function xmlToWordFont(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    return ret;
}
function xmlToLyricFont(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "name") {
            let dataName = getString(ch2, true);
            ret.name = dataName;
        }
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    return ret;
}
function xmlToLyricLanguage(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
        }
        if (ch2.name === "name") {
            let dataName = getString(ch2, true);
            ret.name = dataName;
        }
    }
    return ret;
}
function xmlToCredit(node) {
    let ret = {};
    ret.creditWords = [];
    let foundCreditTypes = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "credit-type") {
            let dataCreditTypes = getString(ch, true);
            ret.creditTypes = (ret.creditTypes || []).concat(dataCreditTypes);
            foundCreditTypes = true;
        }
        if (ch.nodeName === "credit-words") {
            let dataCreditWords = xmlToCreditWords(ch);
            ret.creditWords.push(dataCreditWords);
        }
        if (ch.nodeName === "credit-image") {
            let dataCreditImage = xmlToCreditImage(ch);
            ret.creditImage = dataCreditImage;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "page") {
            let dataPage = getNumber(ch2, true);
            ret.page = dataPage;
        }
    }
    if (!foundCreditTypes) {
        ret.creditTypes = [];
    }
    return ret;
}
function xmlToCreditWords(node) {
    let ret = {};
    let foundJustify = false;
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundHalign = false;
    let foundValign = false;
    let foundUnderline = false;
    let foundOverline = false;
    let foundLineThrough = false;
    let foundRotation = false;
    let foundLetterSpacing = false;
    let foundLineHeight = false;
    let foundDir = false;
    let foundEnclosure = false;
    let foundFontFamily = false;
    let foundRelativeX = false;
    let foundRelativeY = false;
    let foundDefaultX = false;
    let foundDefaultY = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
            foundDefaultX = true;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
            foundRelativeY = true;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
            foundDefaultY = true;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
            foundRelativeX = true;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
            foundFontFamily = true;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValign = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valign = dataValign;
            foundValign = true;
        }
        if (ch2.name === "underline") {
            let dataUnderline = getNumber(ch2, true);
            ret.underline = dataUnderline;
            foundUnderline = true;
        }
        if (ch2.name === "overline") {
            let dataOverline = getNumber(ch2, true);
            ret.overline = dataOverline;
            foundOverline = true;
        }
        if (ch2.name === "line-through") {
            let dataLineThrough = getNumber(ch2, true);
            ret.lineThrough = dataLineThrough;
            foundLineThrough = true;
        }
        if (ch2.name === "rotation") {
            let dataRotation = getNumber(ch2, true);
            ret.rotation = dataRotation;
            foundRotation = true;
        }
        if (ch2.name === "letter-spacing") {
            let dataLetterSpacing = getString(ch2, true);
            ret.letterSpacing = dataLetterSpacing;
            foundLetterSpacing = true;
        }
        if (ch2.name === "line-height") {
            let dataLineHeight = getString(ch2, true);
            ret.lineHeight = dataLineHeight;
            foundLineHeight = true;
        }
        if (ch2.name === "dir") {
            let dataDir = getDirectionMode(ch2, DirectionMode.Ltr);
            ret.dir = dataDir;
            foundDir = true;
        }
        if (ch2.name === "enclosure") {
            let dataEnclosure = getEnclosureShape(ch2, EnclosureShape.None);
            ret.enclosure = dataEnclosure;
            foundEnclosure = true;
        }
    }
    let ch3 = node;
    let dataWords = getString(ch3, true);
    ret.words = dataWords;
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValign) {
        ret.valign = TopMiddleBottomBaseline.Bottom;
    }
    if (!foundUnderline) {
        ret.underline = 0;
    }
    if (!foundOverline) {
        ret.overline = 0;
    }
    if (!foundLineThrough) {
        ret.lineThrough = 0;
    }
    if (!foundRotation) {
        ret.rotation = 0;
    }
    if (!foundLetterSpacing) {
        ret.letterSpacing = "normal";
    }
    if (!foundLineHeight) {
        ret.lineHeight = "normal";
    }
    if (!foundDir) {
        ret.dir = DirectionMode.Ltr;
    }
    if (!foundEnclosure) {
        ret.enclosure = EnclosureShape.None;
    }
    if (!foundFontFamily) {
        ret.fontFamily = "";
    }
    if (!foundRelativeX) {
        ret.relativeX = null;
    }
    if (!foundRelativeY) {
        ret.relativeY = null;
    }
    if (!foundDefaultX) {
        ret.defaultX = null;
    }
    if (!foundDefaultY) {
        ret.defaultY = null;
    }
    return ret;
}
function xmlToCreditImage(node) {
    let ret = {};
    let foundHalign = false;
    let foundValignImage = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "halign") {
            let dataHalign = getLeftCenterRight(ch2, ret.justify || LeftCenterRight.Left);
            ret.halign = dataHalign;
            foundHalign = true;
        }
        if (ch2.name === "valign") {
            let dataValignImage = getTopMiddleBottomBaseline(ch2, TopMiddleBottomBaseline.Bottom);
            ret.valignImage = dataValignImage;
            foundValignImage = true;
        }
        if (ch2.name === "type") {
            let dataType = getString(ch2, true);
            ret.type = dataType;
        }
        if (ch2.name === "source") {
            let dataSource = getString(ch2, true);
            ret.source = dataSource;
        }
    }
    if (!foundHalign) {
        ret.halign = ret.justify || LeftCenterRight.Left;
    }
    if (!foundValignImage) {
        ret.valignImage = TopMiddleBottomBaseline.Bottom;
    }
    return ret;
}
function xmlToPartList(node) {
    let ret = [];
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "score-part") {
            let dataScoreParts = xmlToScorePart(ch);
            ret.push(dataScoreParts);
        }
        if (ch.nodeName === "part-group") {
            let dataPartGroups = xmlToPartGroup(ch);
            ret.push(dataPartGroups);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToScorePart(node) {
    let ret = {
        _class: "ScorePart",
        identification: null,
        partNameDisplay: null,
        scoreInstruments: [],
        midiDevices: [],
        partName: null,
        partAbbreviationDisplay: null,
        partAbbreviation: null,
        groups: [],
        midiInstruments: [],
        id: "",
    };
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "identification") {
            let dataIdentification = xmlToIdentification(ch);
            ret.identification = dataIdentification;
        }
        if (ch.nodeName === "part-name-display") {
            let dataPartNameDisplay = xmlToPartNameDisplay(ch);
            ret.partNameDisplay = dataPartNameDisplay;
        }
        if (ch.nodeName === "score-instrument") {
            let dataScoreInstruments = xmlToScoreInstrument(ch);
            ret.scoreInstruments = (ret.scoreInstruments || []).concat(dataScoreInstruments);
        }
        if (ch.nodeName === "midi-device") {
            let dataMidiDevices = xmlToMidiDevice(ch);
            ret.midiDevices = (ret.midiDevices || []).concat(dataMidiDevices);
        }
        if (ch.nodeName === "part-name") {
            let dataPartName = xmlToPartName(ch);
            ret.partName = dataPartName;
        }
        if (ch.nodeName === "part-abbreviation-display") {
            let dataPartAbbreviationDisplay = xmlToPartAbbreviationDisplay(ch);
            ret.partAbbreviationDisplay = dataPartAbbreviationDisplay;
        }
        if (ch.nodeName === "part-abbreviation") {
            let dataPartAbbreviation = xmlToPartAbbreviation(ch);
            ret.partAbbreviation = dataPartAbbreviation;
        }
        if (ch.nodeName === "group") {
            let dataGroups = getString(ch, true);
            ret.groups = (ret.groups || []).concat(dataGroups);
        }
        if (ch.nodeName === "midi-instrument") {
            let dataMidiInstruments = xmlToMidiInstrument(ch);
            ret.midiInstruments = (ret.midiInstruments || []).concat(dataMidiInstruments);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "id") {
            let dataId = getString(ch2, true);
            ret.id = dataId;
        }
    }
    return ret;
}
function xmlToPartName(node) {
    let ret = {
        partName: "",
        defaultX: null,
        defaultY: null,
        relativeX: null,
        relativeY: null,
        fontFamily: "",
        fontSize: "",
    };
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPrintObject = false;
    let foundJustify = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    let ch3 = node;
    let dataPartName = getString(ch3, true);
    ret.partName = dataPartName;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    return ret;
}
function xmlToPartAbbreviation(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundPrintObject = false;
    let foundJustify = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "print-object") {
            let dataPrintObject = xmlToYesNo(ch2);
            ret.printObject = dataPrintObject;
            foundPrintObject = true;
        }
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    let ch3 = node;
    let dataAbbreviation = getString(ch3, true);
    ret.abbreviation = dataAbbreviation;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundPrintObject) {
        ret.printObject = true;
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    return ret;
}
function xmlToPartGroup(node) {
    let ret = {
        _class: "PartGroup",
    };
    let foundNumber_ = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "group-name-display") {
            let dataGroupNameDisplay = xmlToGroupNameDisplay(ch);
            ret.groupNameDisplay = dataGroupNameDisplay;
        }
        if (ch.nodeName === "group-symbol") {
            let dataGroupSymbol = xmlToGroupSymbol(ch);
            ret.groupSymbol = dataGroupSymbol;
        }
        if (ch.nodeName === "group-name") {
            let dataGroupName = xmlToGroupName(ch);
            ret.groupName = dataGroupName;
        }
        if (ch.nodeName === "group-abbreviation-display") {
            let dataGroupAbbreviationDisplay = xmlToGroupAbbreviationDisplay(ch);
            ret.groupAbbreviationDisplay = dataGroupAbbreviationDisplay;
        }
        if (ch.nodeName === "group-barline") {
            let dataGroupBarline = xmlToGroupBarline(ch);
            ret.groupBarline = dataGroupBarline;
        }
        if (ch.nodeName === "footnote") {
            let dataFootnote = xmlToFootnote(ch);
            ret.footnote = dataFootnote;
        }
        if (ch.nodeName === "level") {
            let dataLevel = xmlToLevel(ch);
            ret.level = dataLevel;
        }
        if (ch.nodeName === "group-abbreviation") {
            let dataGroupAbbreviation = xmlToGroupAbbreviation(ch);
            ret.groupAbbreviation = dataGroupAbbreviation;
        }
        if (ch.nodeName === "group-time") {
            let dataGroupTime = xmlToGroupTime(ch);
            ret.groupTime = dataGroupTime;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "number") {
            let dataNumber = getNumber(ch2, true);
            ret.number = dataNumber;
            foundNumber_ = true;
        }
        if (ch2.name === "type") {
            let dataType = getStartStop(ch2, null);
            ret.type = dataType;
        }
    }
    if (!foundNumber_) {
        ret.number = 1;
    }
    return ret;
}
function xmlToGroupName(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundJustify = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    let ch3 = node;
    let dataName = getString(ch3, true);
    ret.name = dataName;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    return ret;
}
function xmlToGroupAbbreviation(node) {
    let ret = {};
    let foundFontWeight = false;
    let foundFontStyle = false;
    let foundColor = false;
    let foundJustify = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "font-family") {
            let dataFontFamily = getString(ch2, true);
            ret.fontFamily = dataFontFamily;
        }
        if (ch2.name === "font-weight") {
            let dataFontWeight = getNormalBold(ch2, NormalBold.Normal);
            ret.fontWeight = dataFontWeight;
            foundFontWeight = true;
        }
        if (ch2.name === "font-style") {
            let dataFontStyle = getNormalItalic(ch2, NormalItalic.Normal);
            ret.fontStyle = dataFontStyle;
            foundFontStyle = true;
        }
        if (ch2.name === "font-size") {
            let dataFontSize = getString(ch2, true);
            ret.fontSize = dataFontSize;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
        if (ch2.name === "justify") {
            let dataJustify = getLeftCenterRight(ch2, LeftCenterRight.Left);
            ret.justify = dataJustify;
            foundJustify = true;
        }
    }
    let ch3 = node;
    let dataText = getString(ch3, true);
    ret.text = dataText;
    if (!foundFontWeight) {
        ret.fontWeight = NormalBold.Normal;
    }
    if (!foundFontStyle) {
        ret.fontStyle = NormalItalic.Normal;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    if (!foundJustify) {
        ret.justify = LeftCenterRight.Left;
    }
    return ret;
}
function xmlToGroupSymbol(node) {
    let ret = {};
    let foundData = false;
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "default-x") {
            let dataDefaultX = getNumber(ch2, true);
            ret.defaultX = dataDefaultX;
        }
        if (ch2.name === "relative-y") {
            let dataRelativeY = getNumber(ch2, true);
            ret.relativeY = dataRelativeY;
        }
        if (ch2.name === "default-y") {
            let dataDefaultY = getNumber(ch2, true);
            ret.defaultY = dataDefaultY;
        }
        if (ch2.name === "relative-x") {
            let dataRelativeX = getNumber(ch2, true);
            ret.relativeX = dataRelativeX;
        }
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getPartSymbolType(ch3, PartSymbolType.None);
    ret.data = dataData;
    if (!foundData) {
        ret.data = PartSymbolType.None;
    }
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToGroupBarline(node) {
    let ret = {};
    let foundColor = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "color") {
            let dataColor = getString(ch2, true);
            ret.color = dataColor;
            foundColor = true;
        }
    }
    let ch3 = node;
    let dataData = getString(ch3, true);
    ret.data = dataData;
    if (!foundColor) {
        ret.color = "#000000";
    }
    return ret;
}
function xmlToGroupTime(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToScoreInstrument(node) {
    let ret = {
        instrumentName: "",
        instrumentSound: "",
        ensemble: "",
        virtualInstrument: null,
        instrumentAbbreviation: "",
        solo: null,
        id: "",
    };
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "instrument-name") {
            let dataInstrumentName = getString(ch, true);
            ret.instrumentName = dataInstrumentName;
        }
        if (ch.nodeName === "instrument-sound") {
            let dataInstrumentSound = getString(ch, true);
            ret.instrumentSound = dataInstrumentSound;
        }
        if (ch.nodeName === "ensemble") {
            let dataEnsemble = getString(ch, true);
            ret.ensemble = dataEnsemble;
        }
        if (ch.nodeName === "virtual-instrument") {
            let dataVirtualInstrument = xmlToVirtualInstrument(ch);
            ret.virtualInstrument = dataVirtualInstrument;
        }
        if (ch.nodeName === "instrument-abbreviation") {
            let dataInstrumentAbbreviation = getString(ch, true);
            ret.instrumentAbbreviation = dataInstrumentAbbreviation;
        }
        if (ch.nodeName === "solo") {
            let dataSolo = xmlToSolo(ch);
            ret.solo = dataSolo;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "id") {
            let dataId = getString(ch2, true);
            ret.id = dataId;
        }
    }
    return ret;
}
function xmlToSolo(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToVirtualInstrument(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "virtual-library") {
            let dataVirtualLibrary = getString(ch, true);
            ret.virtualLibrary = dataVirtualLibrary;
        }
        if (ch.nodeName === "virtual-name") {
            let dataVirtualName = getString(ch, true);
            ret.virtualName = dataVirtualName;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToScoreHeader(node) {
    let ret = {};
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "movement-title") {
            let dataMovementTitle = getString(ch, true);
            ret.movementTitle = dataMovementTitle;
        }
        if (ch.nodeName === "identification") {
            let dataIdentification = xmlToIdentification(ch);
            ret.identification = dataIdentification;
        }
        if (ch.nodeName === "defaults") {
            let dataDefaults = xmlToDefaults(ch);
            ret.defaults = dataDefaults;
        }
        if (ch.nodeName === "work") {
            let dataWork = xmlToWork(ch);
            ret.work = dataWork;
        }
        if (ch.nodeName === "credit") {
            let dataCredits = xmlToCredit(ch);
            ret.credits = (ret.credits || []).concat(dataCredits);
        }
        if (ch.nodeName === "part-list") {
            let dataPartList = xmlToPartList(ch);
            ret.partList = dataPartList;
        }
        if (ch.nodeName === "movement-number") {
            let dataMovementNumber = getString(ch, true);
            ret.movementNumber = dataMovementNumber;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return ret;
}
function xmlToScoreTimewise(node) {
    let ret = {};
    let foundVersion_ = false;
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "measure") {
            let dataMeasures = xmlToMeasure(ch);
            ret.measures = (ret.measures || []).concat(dataMeasures);
        }
        if (ch.nodeName === "movement-title") {
            let dataMovementTitle = getString(ch, true);
            ret.movementTitle = dataMovementTitle;
        }
        if (ch.nodeName === "identification") {
            let dataIdentification = xmlToIdentification(ch);
            ret.identification = dataIdentification;
        }
        if (ch.nodeName === "defaults") {
            let dataDefaults = xmlToDefaults(ch);
            ret.defaults = dataDefaults;
        }
        if (ch.nodeName === "work") {
            let dataWork = xmlToWork(ch);
            ret.work = dataWork;
        }
        if (ch.nodeName === "credit") {
            let dataCredits = xmlToCredit(ch);
            ret.credits = (ret.credits || []).concat(dataCredits);
        }
        if (ch.nodeName === "part-list") {
            let dataPartList = xmlToPartList(ch);
            ret.partList = dataPartList;
        }
        if (ch.nodeName === "movement-number") {
            let dataMovementNumber = getString(ch, true);
            ret.movementNumber = dataMovementNumber;
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
        if (ch2.name === "version") {
            let dataVersion = getString(ch2, true);
            ret.version = dataVersion;
            foundVersion_ = true;
        }
    }
    if (!foundVersion_) {
        ret.version = "1.0";
    }
    return ret;
}
function xmlToPart(node) {
    let rarr = [];
    for (let i = 0; i < node.children.length; ++i) {
        let ch = node.children[i];
        if (ch.nodeName === "note") {
            let data = xmlToNote(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "backup") {
            let data = xmlToBackup(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "harmony") {
            let data = xmlToHarmony(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "forward") {
            let data = xmlToForward(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "print") {
            let data = xmlToPrint(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "figured-bass") {
            let data = xmlToFiguredBass(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "direction") {
            let data = xmlToDirection(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "attributes") {
            let data = xmlToAttributes(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "sound") {
            let data = xmlToSound(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "barline") {
            let data = xmlToBarline(ch);
            rarr = (rarr || []).concat(data);
        }
        if (ch.nodeName === "grouping") {
            let data = xmlToGrouping(ch);
            rarr = (rarr || []).concat(data);
        }
    }
    for (let i = 0; i < node.attributes.length; ++i) {
        let ch2 = node.attributes[i];
    }
    return rarr;
}
/*---- Serialization ----------------------------------------------------------------------------*/
/**
 * Safe, escaped tagged template handler.
 */
function xml(literals, ...vals) {
    let escaped = "";
    for (let i = 0; i < literals.length; ++i) {
        escaped += literals[i];
        if (i < vals.length) {
            escaped += ("" + vals[i])
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/"/g, "&apos;");
        }
    }
    return escaped;
}
/**
 * Safe tagged template handler for YesNo.
 */
function yesNo(literals, ...booleans) {
    let escaped = "";
    for (let i = 0; i < literals.length; ++i) {
        escaped += literals[i];
        if (i < booleans.length) {
            escaped += booleans[i] ? "yes" : "no";
        }
    }
    return escaped;
}
/**
 * Unescaped tagged template literal
 */
function dangerous(literals, ...vals) {
    let result = "";
    for (let i = 0; i < literals.length; ++i) {
        result += literals[i];
        if (i < vals.length) {
            result += vals[i];
        }
    }
    return result;
}
function defined(val) {
    return val !== undefined && val !== null && val !== "";
}
function scalingToXML(scaling) {
    // <!ELEMENT scaling (millimeters, tenths)>
    let children = [];
    if (defined(scaling.millimeters)) {
        children.push(millimetersToXML(scaling.millimeters));
    }
    if (defined(scaling.tenths)) {
        children.push(tenthsToXML(scaling.tenths));
    }
    return dangerous `<scaling>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</scaling>`;
}
function millimetersToXML(mm) {
    return xml `<millimeters>${mm}</millimeters>`;
}
function tenthsToXML(tenths) {
    return xml `<tenths>${tenths}</tenths>`;
}
function pageLayoutToXML(pageLayout) {
    // <!ELEMENT page-layout ((page-height, page-width)?,
    //     (page-margins, page-margins?)?)>
    // <!ELEMENT page-height %layout-tenths;>
    // <!ELEMENT page-width %layout-tenths;>
    let children = [];
    if (defined(pageLayout.pageHeight)) {
        children.push(xml `<page-height>${pageLayout.pageHeight}</page-height>`);
    }
    if (defined(pageLayout.pageWidth)) {
        children.push(xml `<page-width>${pageLayout.pageWidth}</page-width>`);
    }
    (pageLayout.pageMargins || []).forEach((pageMargins) => {
        children.push(pageMarginsToXML(pageMargins));
    });
    return dangerous `<page-layout>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</page-layout>`;
}
let oddEvenBothToXML = {
    2: "both",
    1: "even",
    0: "odd",
};
function pageMarginsToXML(pageMargins) {
    // <!ELEMENT page-margins (left-margin, right-margin,
    //     top-margin, bottom-margin)>
    // <!ATTLIST page-margins
    //     type (odd | even | both) #IMPLIED
    // >
    let children = [];
    children = children.concat(hmarginsToXML(pageMargins));
    children = children.concat(vmarginsToXML(pageMargins));
    let attribs = "";
    if (defined(pageMargins.type)) {
        attribs += xml ` type="${oddEvenBothToXML[pageMargins.type]}"`;
    }
    return dangerous `<page-margins${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</page-margins>`;
}
function hmarginsToXML(hmargins) {
    // <!ELEMENT left-margin %layout-tenths;>
    // <!ELEMENT right-margin %layout-tenths;>
    let children = [];
    if (defined(hmargins.leftMargin)) {
        children.push(xml `<left-margin>${hmargins.leftMargin}</left-margin>`);
    }
    if (defined(hmargins.rightMargin)) {
        children.push(xml `<right-margin>${hmargins.rightMargin}</right-margin>`);
    }
    return children;
}
function vmarginsToXML(hmargins) {
    // <!ELEMENT top-margin %layout-tenths;>
    // <!ELEMENT bottom-margin %layout-tenths;>
    let children = [];
    if (defined(hmargins.topMargin)) {
        children.push(xml `<top-margin>${hmargins.topMargin}</top-margin>`);
    }
    if (defined(hmargins.bottomMargin)) {
        children.push(xml `<bottom-margin>${hmargins.bottomMargin}</bottom-margin>`);
    }
    return children;
}
function systemLayoutToXML(systemLayout) {
    // <!ELEMENT system-layout
    //     (system-margins?, system-distance?,
    //      top-system-distance?, system-dividers?)>
    let children = [];
    if (defined(systemLayout.systemMargins)) {
        children.push(systemMarginsToXML(systemLayout.systemMargins));
    }
    if (defined(systemLayout.systemDistance)) {
        children.push(xml `<system-distance>${systemLayout.systemDistance}</system-distance>`);
    }
    if (defined(systemLayout.topSystemDistance)) {
        children.push(xml `<top-system-distance>${systemLayout.topSystemDistance}</top-system-distance>`);
    }
    if (defined(systemLayout.systemDividers)) {
        children.push(systemDividersToXML(systemLayout.systemDividers));
    }
    return dangerous `<system-layout>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</system-layout>`;
}
function systemMarginsToXML(systemMargins) {
    // <!ELEMENT system-margins (left-margin, right-margin)>
    let children = hmarginsToXML(systemMargins);
    return dangerous `<system-margins>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</system-margins>`;
}
function systemDividersToXML(systemDividers) {
    // <!ELEMENT system-dividers (left-divider, right-divider)>
    // <!ELEMENT left-divider EMPTY>
    // <!ATTLIST left-divider
    //     %print-object;
    //     %print-style-align;
    // >
    // <!ELEMENT right-divider EMPTY>
    // <!ATTLIST right-divider
    //     %print-object;
    //     %print-style-align;
    // >
    let children = [];
    if (defined(systemDividers.leftDivider)) {
        children.push(xml `<left-divider${printObjectToXML(systemDividers.leftDivider) +
            printStyleAlignToXML(systemDividers.leftDivider)} />`);
    }
    if (defined(systemDividers.rightDivider)) {
        children.push(xml `<right-divider${printObjectToXML(systemDividers.rightDivider) +
            printStyleAlignToXML(systemDividers.rightDivider)} />`);
    }
    return dangerous `<system-dividers>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</system-dividers>`;
}
function appearanceToXML(appearance) {
    // <!ELEMENT appearance
    //     (line-width*, note-size*, distance*,
    //      other-appearance*)>
    let children = [];
    Object.keys(appearance.lineWidths || {}).forEach((key) => {
        children.push(lineWidthToXML(appearance.lineWidths[key]));
    });
    Object.keys(appearance.noteSizes || {}).forEach((key) => {
        children.push(noteSizeToXML(appearance.noteSizes[key]));
    });
    Object.keys(appearance.distances || {}).forEach((key) => {
        children.push(distanceToXML(appearance.distances[key]));
    });
    // TODO: fix musicxml-interfaces
    // appearance.otherAppearances.forEach(otherAppearance => {
    //     children.push(otherAppearanceToXML(otherAppearance));
    // });
    return dangerous `<appearance>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</appearance>`;
}
function lineWidthToXML(lineWidth) {
    // <!ELEMENT line-width %layout-tenths;>
    // <!ATTLIST line-width
    //     type CDATA #REQUIRED
    // >
    return xml `<line-width type="${lineWidth.type}">${lineWidth.tenths}</line-width>`;
}
let cueGraceLargeToXML = {
    1: "grace",
    0: "cue",
    2: "large",
};
function noteSizeToXML(noteSize) {
    // <!ELEMENT note-size (#PCDATA)>
    // <!ATTLIST note-size
    //     type (cue | grace | large) #REQUIRED
    // >
    return xml `<note-size type="${cueGraceLargeToXML[noteSize.type]}">${noteSize.size}</note-size>`;
}
function distanceToXML(distance) {
    // <!ELEMENT distance %layout-tenths;>
    // <!ATTLIST distance
    //     type CDATA #REQUIRED
    // >
    return xml `<distance type="${distance.type}">${distance.tenths}</distance>`;
}
function workToXML(work) {
    // <!ELEMENT work (work-number?, work-title?, opus?)>
    if (!work || (!work.workNumber && !work.workTitle)) {
        return xml `<!-- no work metadata -->`;
    }
    let children = [];
    if (defined(work.workNumber)) {
        // <!ELEMENT work-number (#PCDATA)>
        children.push(xml `<work-number>${work.workNumber}</work-number>`);
    }
    if (defined(work.workTitle)) {
        // <!ELEMENT work-title (#PCDATA)>
        children.push(xml `<work-title>${work.workTitle}</work-title>`);
    }
    if (defined(work.opus) && !!work.opus) {
        // <!ELEMENT opus EMPTY>
        // <!ATTLIST opus
        //     %link-attributes;
        //     >
        console.warn("link-attributes in <opus /> aren't implemented."); // TODO: IMPLEMENT link-attributes
        children.push(dangerous `<opus />`);
    }
    return dangerous `<work>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</work>`;
}
function movementNumberToXML(movementNumber) {
    // <!ELEMENT movement-number (#PCDATA)>
    if (!movementNumber) {
        return xml `<!-- no movement-number metadata -->`;
    }
    return xml `<movement-number>${movementNumber}</movement-number>`;
}
function movementTitleToXML(movementTitle) {
    // <!ELEMENT movement-title (#PCDATA)>
    if (!movementTitle) {
        return xml `<!-- no movement-title metadata -->`;
    }
    return xml `<movement-title>${movementTitle}</movement-title>`;
}
function identificationToXML(identification) {
    // <!ELEMENT identification (creator*, rights*, encoding?,
    //     source?, relation*, miscellaneous?)>
    let children = [];
    (identification.creators || []).forEach((creator) => {
        children.push(creatorToXML(creator));
    });
    (identification.rights || []).forEach((rights) => {
        children.push(rightsToXML(rights));
    });
    if (defined(identification.encoding)) {
        children.push(encodingToXML(identification.encoding));
    }
    if (defined(identification.source) && !!identification.source) {
        children.push(sourceToXML(identification.source));
    }
    (identification.relations || []).forEach((relation) => {
        children.push(relationToXML(relation));
    });
    if (defined(identification.miscellaneous)) {
        children.push(miscellaneousToXML(identification.miscellaneous));
    }
    return dangerous `<identification>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</identification>`;
}
function creatorToXML(creator) {
    // <!ELEMENT creator (#PCDATA)>
    // <!ATTLIST creator
    //     type CDATA #IMPLIED
    // >
    let attribs = "";
    if (creator.type) {
        attribs += xml ` type="${creator.type}"`;
    }
    let pcdata = xml `${creator.creator}`;
    return dangerous `<creator${attribs}>${pcdata}</creator>`;
}
function rightsToXML(rights) {
    // <!ELEMENT rights (#PCDATA)>
    // <!ATTLIST rights
    //     type CDATA #IMPLIED
    // >
    let attribs = "";
    if (rights.type) {
        attribs += xml ` type="${rights.type}"`;
    }
    let pcdata = xml `${rights.rights}`;
    return dangerous `<rights${attribs}>${pcdata}</rights>`;
}
function encodingToXML(encoding) {
    // <!ELEMENT encoding ((encoding-date | encoder | software |
    //     encoding-description | supports)*)>
    let children = [];
    if (defined(encoding.encodingDate)) {
        children.push(encodingDateToXML(encoding.encodingDate));
    }
    (encoding.encoders || []).forEach((encoder) => {
        children.push(encoderToXML(encoder));
    });
    (encoding.softwares || []).forEach((software) => {
        children.push(softwareToXML(software));
    });
    (encoding.encodingDescriptions || []).forEach((encodingDescription) => {
        children.push(encodingDescriptionToXML(encodingDescription));
    });
    Object.keys(encoding.supports || {}).forEach((key) => {
        children.push(supportsToXML(encoding.supports[key]));
    });
    return dangerous `<encoding>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</encoding>`;
}
function encodingDateToXML(encodingDate) {
    // <!ELEMENT encoding-date %yyyy-mm-dd;>
    return xml `<encoding-date>${("0000" + encodingDate.year).slice(-4)}-${("00" + encodingDate.month).slice(-2)}-${("00" + encodingDate.day).slice(-2)}</encoding-date>`;
}
function encoderToXML(encoder) {
    // <!ELEMENT encoder (#PCDATA)>
    // <!ATTLIST encoder
    //     type CDATA #IMPLIED
    // >
    let attribs = "";
    if (defined(encoder.type)) {
        attribs = xml ` type="${encoder.type}"`;
    }
    let pcdata = xml `${encoder.encoder}`;
    return dangerous `<encoder${attribs}>${pcdata}</encoder>`;
}
function softwareToXML(software) {
    // <!ELEMENT software (#PCDATA)>
    return xml `<software>${software}</software>`;
}
function encodingDescriptionToXML(encodingDescription) {
    // <!ELEMENT encoding-description (#PCDATA)>
    return xml `<encoding-description>${encodingDescription}</encoding-description>`;
}
function supportsToXML(supports) {
    // <!ELEMENT supports EMPTY>
    // <!ATTLIST supports
    //     type %yes-no; #REQUIRED
    //     element CDATA #REQUIRED
    //     attribute CDATA #IMPLIED
    //     value CDATA #IMPLIED
    let attribs = "";
    if (defined(supports.type)) {
        attribs += yesNo ` type="${supports.type}"`;
    }
    if (defined(supports.element)) {
        attribs += xml ` element="${supports.element}"`;
    }
    if (defined(supports.attribute)) {
        attribs += xml ` attribute="${supports.attribute}"`;
    }
    if (defined(supports.value)) {
        attribs += xml ` value="${supports.value}"`;
    }
    return dangerous `<supports${attribs} />`;
}
function sourceToXML(source) {
    // <!ELEMENT source (#PCDATA)>
    return xml `<source>${source}</source>`;
}
function relationToXML(relation) {
    // <!ELEMENT relation (#PCDATA)>
    // <!ATTLIST relation
    //     type CDATA #IMPLIED
    // >
    let attribs = "";
    if (relation.type) {
        attribs += xml ` type="${relation.type}"`;
    }
    let pcdata = xml `${relation.data}`;
    return dangerous `<relation${attribs}>${pcdata}</relation>`;
}
function miscellaneousToXML(miscellaneous) {
    // <!ELEMENT miscellaneous (miscellaneous-field*)>
    let children = miscellaneous.miscellaneousFields.map((field) => miscellaneousFieldToXML(field));
    return dangerous `<miscellaneous>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</miscellaneous>`;
}
function miscellaneousFieldToXML(field) {
    // <!ELEMENT miscellaneous-field (#PCDATA)>
    // <!ATTLIST miscellaneous-field
    //     name CDATA #REQUIRED
    // >
    return xml `<miscellaneous-field name="${field.name}">${field.data || ""}</miscellaneous-field>`;
}
function defaultsToXML(defaults) {
    // <!ELEMENT defaults (scaling?, page-layout?,
    //     system-layout?, staff-layout*, appearance?,
    //     music-font?, word-font?, lyric-font*, lyric-language*)>
    let children = [];
    if (defined(defaults.scaling)) {
        children.push(scalingToXML(defaults.scaling));
    }
    if (defined(defaults.pageLayout)) {
        children.push(pageLayoutToXML(defaults.pageLayout));
    }
    if (defined(defaults.systemLayout)) {
        children.push(systemLayoutToXML(defaults.systemLayout));
    }
    if (defined(defaults.appearance)) {
        children.push(appearanceToXML(defaults.appearance));
    }
    if (defined(defaults.musicFont)) {
        children.push(musicFontToXML(defaults.musicFont));
    }
    if (defined(defaults.wordFont)) {
        children.push(wordFontToXML(defaults.wordFont));
    }
    (defaults.lyricFonts || []).forEach((lyricFont) => {
        children.push(lyricFontToXML(lyricFont));
    });
    (defaults.lyricLanguages || []).forEach((lyricLanguage) => {
        children.push(lyricLanguageToXML(lyricLanguage));
    });
    return dangerous `<defaults>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</defaults>`;
}
function musicFontToXML(musicFont) {
    // <!ELEMENT music-font EMPTY>
    // <!ATTLIST music-font
    //     %font;
    // >
    return dangerous `<music-font${fontToXML(musicFont)} />`;
}
function wordFontToXML(wordFont) {
    // <!ELEMENT word-font EMPTY>
    // <!ATTLIST word-font
    //     %font;
    // >
    return dangerous `<word-font${fontToXML(wordFont)} />`;
}
function lyricFontToXML(lyricFont) {
    // <!ELEMENT lyric-font EMPTY>
    // <!ATTLIST lyric-font
    //     number NMTOKEN #IMPLIED
    //     name CDATA #IMPLIED
    //     %font;
    // >
    return dangerous `<lyric-font${numberLevelToXML(lyricFont) + nameToXML(lyricFont) + fontToXML(lyricFont)} />`;
}
function lyricLanguageToXML(lyricLanguage) {
    // <!ELEMENT lyric-language EMPTY>
    // <!ATTLIST lyric-language
    //     number NMTOKEN #IMPLIED
    //     name CDATA #IMPLIED
    //     xml:lang NMTOKEN #REQUIRED TODO musicxml-interfaces
    // >
    return dangerous `<lyric-language${numberLevelToXML(lyricLanguage) + nameToXML(lyricLanguage)} />`;
}
function creditToXML(credit) {
    // <!ELEMENT credit
    //     (credit-type*, link*, bookmark*,
    //     (credit-image |
    //      (credit-words, (link*, bookmark*, credit-words)*)))>
    // <!ATTLIST credit
    //     page NMTOKEN #IMPLIED
    // >
    let attributes = "";
    let children = [];
    (credit.creditTypes || []).forEach((creditType) => {
        children.push(creditTypeToXML(creditType));
    });
    // credit.links.forEach(link => { // TODO: missing in musicxml-interfaces
    //     children.push(linkToXML(link));
    // });
    // credit.bookmarks.forEach(bookmark => { // TODO: missing in musicxml-interfaces
    //     children.push(bookmarkToXML(bookmark));
    // });
    if (defined(credit.creditImage)) {
        children.push(creditImageToXML(credit.creditImage));
    }
    (credit.creditWords || []).forEach((words) => {
        children.push(creditWordsToXML(words));
    });
    if (defined(credit.page)) {
        attributes += xml ` page="${credit.page}"`;
    }
    return dangerous `<credit${attributes}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</credit>`;
}
function creditTypeToXML(creditType) {
    // <!ELEMENT credit-type (#PCDATA)>
    return xml `<credit-type>${creditType}</credit-type>`;
}
function creditWordsToXML(creditWords) {
    // <!ELEMENT credit-words (#PCDATA)>
    // <!ATTLIST credit-words
    //     %text-formatting;
    // >
    let pcdata = xml `${creditWords.words}`;
    return dangerous `<credit-words${textFormattingToXML(creditWords)}>${pcdata}</credit-words>`;
}
function creditImageToXML(creditImage) {
    // <!ELEMENT credit-image EMPTY>
    // <!ATTLIST credit-image
    //     source CDATA #REQUIRED
    //     type CDATA #REQUIRED
    //     %position;
    //     %halign;
    //     %valign-image;
    // >
    let attribs = "";
    if (defined(creditImage.source)) {
        attribs += xml ` credit-image="${creditImage.source}"`;
    }
    if (defined(creditImage.type)) {
        attribs += xml ` type="${creditImage.type}"`;
    }
    attribs +=
        positionToXML(creditImage) +
            halignToXML(creditImage) +
            valignImageToXML(creditImage);
    return dangerous `<credit-image${attribs} />`;
}
let topMiddleBottomBaselineToXML = {
    0: "top",
    1: "middle",
    3: "baseline",
    2: "bottom",
};
function valignImageToXML(valignImage) {
    // <!ENTITY % valign-image
    //     "valign (top | middle | bottom) #IMPLIED">
    if (defined(valignImage.valignImage)) {
        return xml ` valign="${topMiddleBottomBaselineToXML[valignImage.valignImage]}"`;
    }
    return "";
}
function partListToXML(partList) {
    // <!ELEMENT part-list (part-group*, score-part,
    //     (part-group | score-part)*)>
    let children = [];
    partList.forEach((partGroupOrScorePart) => {
        if (partGroupOrScorePart._class === "PartGroup") {
            children.push(partGroupToXML(partGroupOrScorePart));
        }
        else if (partGroupOrScorePart._class === "ScorePart") {
            children.push(scorePartToXML(partGroupOrScorePart));
        }
        else {
            console.warn("Unknwn type for", partGroupOrScorePart);
        }
    });
    return dangerous `<part-list>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</part-list>`;
}
function scorePartToXML(scorePart) {
    // <!ELEMENT score-part (identification?,
    //     part-name, part-name-display?,
    //     part-abbreviation?, part-abbreviation-display?,
    //     group*, score-instrument*,
    //     (midi-device?, midi-instrument?)*)>
    // <!ATTLIST score-part
    //     id ID #REQUIRED
    // >
    let children = [];
    let attribs = "";
    if (defined(scorePart.identification)) {
        children.push(identificationToXML(scorePart.identification));
    }
    if (defined(scorePart.partName)) {
        children.push(partNameToXML(scorePart.partName));
    }
    if (defined(scorePart.partNameDisplay)) {
        children.push(partNameDisplayToXML(scorePart.partNameDisplay));
    }
    if (defined(scorePart.partAbbreviation)) {
        children.push(partAbbreviationToXML(scorePart.partAbbreviation));
    }
    if (defined(scorePart.partAbbreviationDisplay)) {
        children.push(partAbbreviationDisplayToXML(scorePart.partAbbreviationDisplay));
    }
    (scorePart.groups || []).forEach((group) => {
        children.push(xml `<group>${group}</group>`);
    });
    (scorePart.scoreInstruments || []).forEach((scoreInstrument) => {
        children.push(scoreInstrumentToXML(scoreInstrument));
    });
    // Is it okay if there are different numbers of devices and instruments?
    (scorePart.midiDevices || []).forEach((device, idx) => {
        children.push(midiDeviceToXML(device));
        if (scorePart.midiInstruments[idx]) {
            children.push(midiInstrumentToXML(scorePart.midiInstruments[idx]));
        }
    });
    if (defined(scorePart.id)) {
        attribs += xml ` id="${scorePart.id}"`;
    }
    return dangerous `<score-part${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</score-part>`;
}
function partNameToXML(partName) {
    // <!ELEMENT part-name (#PCDATA)>
    // <!ATTLIST part-name
    //     %print-style;
    //     %print-object;
    //     %justify;
    // >
    let pcdata = xml `${partName.partName}`;
    return dangerous `<part-name${printStyleToXML(partName) +
        printObjectToXML(partName) +
        justifyToXML(partName)}>${pcdata}</part-name>`;
}
function partNameDisplayToXML(partNameDisplay) {
    // <!ELEMENT part-name-display
    //     ((display-text | accidental-text)*)>
    // <!ATTLIST part-name-display
    //     %print-object;
    // >
    return dangerous `<part-name-display${printObjectToXML(partNameDisplay)}>\n${textArrayToXML(partNameDisplay.name)
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}</part-name-display>`;
}
function partAbbreviationToXML(abbreviation) {
    // <!ELEMENT part-abbreviation (#PCDATA)>
    // <!ATTLIST part-abbreviation
    //     %print-style;
    //     %print-object;
    //     %justify;
    // >
    let pcdata = xml `${abbreviation.abbreviation}`;
    return dangerous `<part-abbreviation${printStyleToXML(abbreviation) +
        printObjectToXML(abbreviation) +
        justifyToXML(abbreviation)}>${pcdata}</part-abbreviation>`;
}
function partAbbreviationDisplayToXML(partAbbreviationDisplay) {
    // <!ELEMENT part-abbreviation-display
    //     ((display-text | accidental-text)*)>
    // <!ATTLIST part-abbreviation-display
    //     %print-object;
    // >
    return dangerous `<part-abbreviation-display${printObjectToXML(partAbbreviationDisplay)}>${textArrayToXML(partAbbreviationDisplay.name)
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}</part-abbreviation-display>`;
}
function textArrayToXML(texts) {
    return texts.map((text) => {
        if (text.acc) {
            return (dangerous `<accidental-text${textFormattingToXML(text.acc)}` +
                xml `>${text.acc.text}</accidental-text>`);
        }
        else if (text.text) {
            return (dangerous `<display-text${textFormattingToXML(text.text)}` +
                xml `>${text.text.text}</display-text>`);
        }
        else {
            throw "Unknown type " + text;
        }
    });
}
function midiDeviceToXML(midiDevice) {
    // <!ELEMENT midi-device (#PCDATA)>
    // <!ATTLIST midi-device
    //     port CDATA #IMPLIED
    //     id IDREF #IMPLIED
    // >
    let attribs = "";
    if (defined(midiDevice.port)) {
        attribs += xml ` port="${midiDevice.port}"`;
    }
    if (defined(midiDevice.id)) {
        attribs += xml ` id="${midiDevice.id}"`;
    }
    let pcdata = xml `${midiDevice.deviceName || ""}`;
    return dangerous `<midi-device${attribs}>${pcdata}</midi-device>`;
}
function midiInstrumentToXML(midiInstrument) {
    // <!ELEMENT midi-instrument
    //     (midi-channel?, midi-name?, midi-bank?, midi-program?,
    //      midi-unpitched?, volume?, pan?, elevation?)>
    // <!ATTLIST midi-instrument
    //     id IDREF #REQUIRED
    // >
    let children = [];
    let attribs = "";
    if (defined(midiInstrument.midiChannel)) {
        // <!ELEMENT midi-channel (#PCDATA)>
        children.push(xml `<midi-channel>${midiInstrument.midiChannel}</midi-channel>`);
    }
    if (defined(midiInstrument.midiName)) {
        // <!ELEMENT midi-name (#PCDATA)>
        children.push(xml `<midi-name>${midiInstrument.midiName}</midi-name>`);
    }
    if (defined(midiInstrument.midiBank)) {
        // <!ELEMENT midi-bank (#PCDATA)>
        children.push(xml `<midi-bank>${midiInstrument.midiBank}</midi-bank>`);
    }
    if (defined(midiInstrument.midiProgram)) {
        // <!ELEMENT midi-program (#PCDATA)>
        children.push(xml `<midi-program>${midiInstrument.midiProgram}</midi-program>`);
    }
    if (defined(midiInstrument.midiUnpitched)) {
        // <!ELEMENT midi-unpitched (#PCDATA)>
        children.push(xml `<midi-unpitched>${midiInstrument.midiUnpitched}</midi-unpitche>`);
    }
    if (defined(midiInstrument.volume)) {
        // <!ELEMENT volume (#PCDATA)>
        children.push(xml `<volume>${midiInstrument.volume}</volume>`);
    }
    if (defined(midiInstrument.pan)) {
        // <!ELEMENT pan (#PCDATA)>
        children.push(xml `<pan>${midiInstrument.pan}</pan>`);
    }
    if (defined(midiInstrument.elevation)) {
        // <!ELEMENT elevation (#PCDATA)>
        children.push(xml `<elevation>${midiInstrument.elevation}</elevation>`);
    }
    if (defined(midiInstrument.id)) {
        attribs += xml ` id="${midiInstrument.id}"`;
    }
    return dangerous `<midi-instrument${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</midi-instrument>`;
}
function scoreInstrumentToXML(scoreInstrument) {
    // <!ELEMENT score-instrument
    //     (instrument-name, instrument-abbreviation?,
    //      instrument-sound?, (solo | ensemble)?,
    //      virtual-instrument?)>
    // <!ATTLIST score-instrument
    //     id ID #REQUIRED
    // >
    let children = [];
    let attribs = xml ` id="${scoreInstrument.id}"`;
    if (defined(scoreInstrument.instrumentName)) {
        // <!ELEMENT instrument-name (#PCDATA)>
        children.push(xml `<instrument-name>${scoreInstrument.instrumentName}</instrument-name>`);
    }
    if (defined(scoreInstrument.instrumentAbbreviation)) {
        // <!ELEMENT instrument-abbreviation (#PCDATA)>
        children.push(xml `<instrument-abbreviation>${scoreInstrument.instrumentAbbreviation}</instrument-abbreviation>`);
    }
    if (defined(scoreInstrument.instrumentSound)) {
        // <!ELEMENT instrument-sound (#PCDATA)>
        children.push(xml `<instrument-sound>${scoreInstrument.instrumentSound}</instrument-sound>`);
    }
    if (scoreInstrument.solo) {
        // <!ELEMENT solo EMPTY>
        children.push(xml `<solo />`);
    }
    if (defined(scoreInstrument.ensemble)) {
        // <!ELEMENT ensemble (#PCDATA)>
        children.push(xml `<ensemble>${scoreInstrument.ensemble}</ensemble>`);
    }
    if (defined(scoreInstrument.virtualInstrument)) {
        // <!ELEMENT virtual-instrument
        //     (virtual-library?, virtual-name?)>
        let vChildren = [];
        let v = scoreInstrument.virtualInstrument;
        if (defined(v.virtualLibrary)) {
            // <!ELEMENT virtual-library (#PCDATA)>
            vChildren.push(xml `<virtual-library>${v.virtualLibrary}</virtual-library>`);
        }
        if (defined(v.virtualName)) {
            // <!ELEMENT virtual-name (#PCDATA)>
            vChildren.push(xml `<virtual-name>${v.virtualName}</virtual-name>`);
        }
        children.push(dangerous `<virtual-instrument>\n${vChildren
            .join("\n")
            .split("\n")
            .map((n) => "  " + n)
            .join("\n")}\n</virtual-instrument>`);
    }
    return dangerous `<score-instrument${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</score-instrument>`;
}
function partGroupToXML(partGroup) {
    // <!ELEMENT part-group (group-name?, group-name-display?,
    //     group-abbreviation?, group-abbreviation-display?,
    //     group-symbol?, group-barline?, group-time?, %editorial;)>
    // <!ATTLIST part-group
    //     type %start-stop; #REQUIRED
    //     number CDATA "1"
    // >
    // <!ELEMENT group-time EMPTY>
    let children = [];
    let attribs = "" + startStopToXML(partGroup) + numberLevelToXML(partGroup);
    if (defined(partGroup.groupName)) {
        children.push(groupNameToXML(partGroup.groupName));
    }
    if (defined(partGroup.groupNameDisplay)) {
        children.push(groupNameDisplayToXML(partGroup.groupNameDisplay));
    }
    if (defined(partGroup.groupAbbreviation)) {
        children.push(groupAbbreviationToXML(partGroup.groupAbbreviation));
    }
    if (defined(partGroup.groupAbbreviationDisplay)) {
        children.push(groupAbbreviationDisplayToXML(partGroup.groupAbbreviationDisplay));
    }
    if (defined(partGroup.groupSymbol)) {
        children.push(groupSymbolToXML(partGroup.groupSymbol));
    }
    if (defined(partGroup.groupBarline)) {
        children.push(groupBarlineToXML(partGroup.groupBarline));
    }
    if (!!partGroup.groupTime) {
        children.push(xml `<group-time />`);
    }
    children = children.concat(editorialToXML(partGroup));
    return dangerous `<part-group${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</part-group>`;
}
function groupNameToXML(groupName) {
    // <!ELEMENT group-name (#PCDATA)>
    // <!ATTLIST group-name
    //     %print-style;
    //     %justify;
    // >
    let pcdata = xml `${groupName.name}`;
    return dangerous `<group-name${printStyleToXML(groupName) + justifyToXML(groupName)}>${pcdata}</group-name>`;
}
function groupNameDisplayToXML(groupNameDisplay) {
    // <!ELEMENT group-name-display
    //     ((display-text | accidental-text)*)>
    // <!ATTLIST group-name-display
    //     %print-object;
    // >
    return ""; // TODO: bug in musicxml-interfaces
    // return dangerous `<group-name-display${
    //     printObjectToXML(groupNameDisplay)}>${
    //         textArrayToXML(groupNameDisplay.name).join("\n")
    //         .split("\n").map(n => "  " + n).join("\n")}</group-name-display>`;
}
function groupAbbreviationToXML(groupAbbreviation) {
    // <!ELEMENT group-abbreviation (#PCDATA)>
    // <!ATTLIST group-abbreviation
    //     %print-style;
    //     %justify;
    // >
    let pcdata = xml `${groupAbbreviation.text}`;
    return dangerous `<group-abbreviation${printStyleToXML(groupAbbreviation) + justifyToXML(groupAbbreviation)}>${pcdata}</group-abbreviation>`;
}
function groupAbbreviationDisplayToXML(groupAbbreviationDisplay) {
    // <!ELEMENT group-abbreviation-display
    //     ((display-text | accidental-text)*)>
    // <!ATTLIST group-abbreviation-display
    //     %print-object;
    // >
    return ""; // TODO: bug in musicxml-interfaces
    // return dangerous `<group-name-display${
    //     printObjectToXML(groupNameDisplay)}>${
    //         textArrayToXML(groupNameDisplay.name).join("\n")
    //         .split("\n").map(n => "  " + n).join("\n")}</group-name-display>`;
}
function groupSymbolToXML(groupSymbol) {
    // <!ELEMENT group-symbol (#PCDATA)>
    // <!ATTLIST group-symbol
    //     %position;
    //     %color;
    // >
    let pcdata = xml `${groupSymbol.data}`;
    return dangerous `<group-symbol${positionToXML(groupSymbol) + colorToXML(groupSymbol)}>${pcdata}</group-symbol>`;
}
function groupBarlineToXML(groupBarline) {
    // <!ELEMENT group-barline (#PCDATA)>
    // <!ATTLIST group-barline
    //     %color;
    // >
    let pcdata = xml `${groupBarline.data}`;
    return dangerous `<group-barline${colorToXML(groupBarline)}>${pcdata}</group-barline>`;
}
function scoreHeaderToXML(header) {
    // <!ENTITY % score-header
    // "(work?, movement-number?, movement-title?,
    // identification?, defaults?, credit*, part-list)">
    let children = [];
    children = children.concat(staffDebugInfoToXMLComment(header));
    if (defined(header.work)) {
        children.push(workToXML(header.work));
    }
    if (defined(header.movementNumber)) {
        children.push(movementNumberToXML(header.movementNumber));
    }
    if (defined(header.movementTitle)) {
        children.push(movementTitleToXML(header.movementTitle));
    }
    if (defined(header.identification)) {
        children.push(identificationToXML(header.identification));
    }
    if (defined(header.defaults)) {
        children.push(defaultsToXML(header.defaults));
    }
    (header.credits || []).forEach((credit) => {
        children.push(creditToXML(credit));
    });
    if (defined(header.partList)) {
        children.push(partListToXML(header.partList));
    }
    return children;
}
function backupToXML(backup) {
    // <!ELEMENT backup (duration, %editorial;)>
    let children = [];
    children.push(xml `<duration>${backup.duration}</duration>`);
    children = children.concat(editorialToXML(backup));
    return dangerous `<backup>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</backup>`;
}
function forwardToXML(forward) {
    // <!ELEMENT forward
    //     (duration, %editorial-voice;, staff?)>
    let children = [];
    children.push(xml `<duration>${forward.duration}</duration>`);
    children = children.concat(editorialVoiceToXML(forward));
    if (forward.staff) {
        children.push(xml `<staff>${forward.staff}</staff>`);
    }
    return dangerous `<forward>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</forward>`;
}
function groupingToXML(grouping) {
    // <!ELEMENT grouping ((feature)*)>
    // <!ATTLIST grouping
    //     type %start-stop-single; #REQUIRED
    //     number CDATA "1"
    //     member-of CDATA #IMPLIED
    // >
    let children = [];
    children = children.concat(staffDebugInfoToXMLComment(grouping));
    (grouping.features || []).forEach((feature) => {
        // <!ELEMENT feature (#PCDATA)>
        // <!ATTLIST feature
        //     type CDATA #IMPLIED
        // >
        let pcdata = xml `${feature.data}`;
        let attribs = "";
        if (defined(feature.type)) {
            attribs += xml ` type="${feature.type}"`;
        }
        children.push(dangerous `<grouping${attribs}>${pcdata}</grouping>`);
    });
    let attribs = "" + startStopSingleToXML(grouping) + numberLevelToXML(grouping);
    if (defined(grouping.memberOf)) {
        attribs += xml ` member-of="${grouping.memberOf}"`;
    }
    return dangerous `<grouping${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</grouping>`;
}
function harmonyToXML(harmony) {
    // <!ENTITY % harmony-chord "((root | function), kind,
    //     inversion?, bass?, degree*)">
    //
    // <!ELEMENT harmony ((%harmony-chord;)+, frame?,
    //     offset?, %editorial;, staff?)>
    // <!ATTLIST harmony
    //     type (explicit | implied | alternate) #IMPLIED
    //     %print-object;
    //     print-frame  %yes-no; #IMPLIED
    //     %print-style;
    //     %placement;
    // >
    let attribs = "" + explicitImpliedAlternateToXML(harmony) + printObjectToXML(harmony);
    if (defined(harmony.printFrame)) {
        attribs += yesNo ` print-frame="${harmony.printFrame}"`;
    }
    attribs += printStyleToXML(harmony) + placementToXML(harmony);
    let children = [];
    children = children.concat(staffDebugInfoToXMLComment(harmony));
    // TODO: multiple of everything in harmony-chord!
    if (defined(harmony.root)) {
        children.push(rootToXML(harmony.root));
    }
    else if (defined(harmony.function)) {
        children.push(functionToXML(harmony.function));
    }
    children.push(kindToXML(harmony.kind));
    if (defined(harmony.inversion)) {
        children.push(inversionToXML(harmony.inversion));
    }
    if (defined(harmony.bass)) {
        children.push(bassToXML(harmony.bass));
    }
    (harmony.degrees || []).forEach((degree) => {
        children.push(degreeToXML(degree));
    });
    if (defined(harmony.frame)) {
        children.push(frameToXML(harmony.frame));
    }
    if (defined(harmony.offset)) {
        children.push(offsetToXML(harmony.offset));
    }
    children = children.concat(editorialToXML(harmony));
    if (!isNaN(harmony.staff)) {
        children.push(xml `<staff>${harmony.staff}</staff>`);
    }
    return dangerous `<harmony${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</harmony>`;
}
let eiaTypeToXML = {
    [ExplicitImpliedAlternate.Explicit]: "explicit",
    [ExplicitImpliedAlternate.Implied]: "implied",
    [ExplicitImpliedAlternate.Alternate]: "alternate",
};
function explicitImpliedAlternateToXML(eia) {
    if (defined(eia.type)) {
        return xml ` type="${eiaTypeToXML[eia.type]}"`;
    }
    return "";
}
function rootToXML(root) {
    // <!ELEMENT root (root-step, root-alter?)>
    let children = [];
    if (defined(root.rootStep)) {
        // <!ELEMENT root-step (#PCDATA)>
        // <!ATTLIST root-step
        //     text CDATA #IMPLIED
        //     %print-style;
        // >
        let attribs = "";
        if (defined(root.rootStep.text)) {
            attribs += xml ` text="${root.rootStep.text}"`;
        }
        attribs += printStyleToXML(root.rootStep);
        let pcdata = xml `${root.rootStep.data}`;
        children.push(dangerous `<root-step${attribs}>${pcdata}</root-step>`);
    }
    if (defined(root.rootAlter)) {
        // <!ELEMENT root-alter (#PCDATA)>
        // <!ATTLIST root-alter
        //     %print-object;
        //     %print-style;
        //     location %left-right; #IMPLIED
        // >
        let attribs = printObjectToXML(root.rootAlter) + printStyleToXML(root.rootAlter);
        if (defined(root.rootAlter.location)) {
            attribs += xml ` location="${root.rootAlter.location === LeftRight.Left ? "left" : "right"}"`;
        }
        let pcdata = root.rootAlter.data;
        children.push(dangerous `<root-alter${attribs}>${pcdata}</root-alter>`);
    }
    return dangerous `<root>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</root>`;
}
function functionToXML(func) {
    // <!ELEMENT function (#PCDATA)>
    // <!ATTLIST function
    //     %print-style;
    // >
    let pcdata = xml `${func.data}`;
    let attribs = printStyleToXML(func);
    return `<function${attribs}>${pcdata}</function>`;
}
function kindToXML(kind) {
    // <!ELEMENT kind (#PCDATA)>
    // <!ATTLIST kind
    //     use-symbols          %yes-no;   #IMPLIED
    //     text                 CDATA      #IMPLIED
    //     stack-degrees        %yes-no;   #IMPLIED
    //     parentheses-degrees  %yes-no;   #IMPLIED
    //     bracket-degrees      %yes-no;   #IMPLIED
    //     %print-style;
    //     %halign;
    //     %valign;
    // >
    let attribs = "";
    if (defined(kind.useSymbols)) {
        attribs += yesNo ` kind="${kind.useSymbols}"`;
    }
    if (defined(kind.text)) {
        attribs += xml ` text="${kind.text}"`;
    }
    if (defined(kind.stackDegrees)) {
        attribs += yesNo ` stack-degrees="${kind.stackDegrees}"`;
    }
    if (defined(kind.parenthesesDegrees)) {
        attribs += yesNo ` parentheses-degrees="${kind.parenthesesDegrees}"`;
    }
    attribs += printStyleToXML(kind) + halignToXML(kind) + valignToXML(kind);
    let pcdata = xml `${kind.data}`;
    return dangerous `<kind${attribs}>\n${pcdata}</kind>`;
}
function inversionToXML(inversion) {
    // <!ELEMENT inversion (#PCDATA)>
    // <!ATTLIST inversion
    //     %print-style;
    //     >
    let pcdata = xml `${inversion.data}`;
    let attribs = printStyleToXML(inversion);
    return `<inversion${attribs}>${pcdata}</inversion>`;
}
function bassToXML(bass) {
    // <!ELEMENT bass (bass-step, bass-alter?)>
    let children = [];
    if (defined(bass.bassStep)) {
        // <!ELEMENT bass-step (#PCDATA)>
        // <!ATTLIST bass-step
        //     text CDATA #IMPLIED
        //     %print-style;
        // >
        let attribs = "";
        if (defined(bass.bassStep.text)) {
            attribs += xml ` text="${bass.bassStep.text}"`;
        }
        attribs += printStyleToXML(bass.bassStep);
        let pcdata = xml `${bass.bassStep.data}`;
        children.push(dangerous `<bass-step${attribs}>${pcdata}</bass-step>`);
    }
    if (defined(bass.bassAlter)) {
        // <!ELEMENT bass-alter (#PCDATA)>
        // <!ATTLIST bass-alter
        //     %print-object;
        //     %print-style;
        //     location (left | right) #IMPLIED
        // >
        let attribs = printObjectToXML(bass.bassAlter) + printStyleToXML(bass.bassAlter);
        if (defined(bass.bassAlter.location)) {
            attribs += xml ` location="${bass.bassAlter.location === LeftRight.Left ? "left" : "right"}"`;
        }
        let pcdata = bass.bassAlter.data;
        children.push(dangerous `<bass-alter${attribs}>${pcdata}</bass-alter>`);
    }
    return dangerous `<bass>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</bass>`;
}
let chordTypeToXML = {
    [ChordType.Augmented]: "augmented",
    [ChordType.Diminished]: "diminished",
    [ChordType.Major]: "major",
    [ChordType.Minor]: "minor",
    [ChordType.HalfDiminished]: "half-diminished",
};
function degreeToXML(degree) {
    // <!ELEMENT degree (degree-value, degree-alter, degree-type)>
    // <!ATTLIST degree
    //     %print-object;
    // >
    let children = [];
    if (defined(degree.degreeValue)) {
        // <!ELEMENT degree-value (#PCDATA)>
        // <!ATTLIST degree-value
        //     symbol (major | minor | augmented |
        //         diminished | half-diminished) #IMPLIED
        //     text CDATA #IMPLIED
        //     %print-style;
        // >
        let lattribs = "";
        if (defined(degree.degreeValue.symbol)) {
            lattribs += xml ` symbol="${chordTypeToXML[degree.degreeValue.symbol]}"`;
        }
        if (defined(degree.degreeValue.text)) {
            lattribs += xml ` text="${degree.degreeValue.text}"`;
        }
        lattribs += printStyleToXML(degree.degreeValue);
        let pcdata = xml `${degree.degreeValue.data}`;
        children.push(dangerous `<degree-value${lattribs}>${pcdata}</degree-value>`);
    }
    if (defined(degree.degreeAlter)) {
        // <!ELEMENT degree-alter (#PCDATA)>
        // <!ATTLIST degree-alter
        //     %print-style;
        //     plus-minus %yes-no; #IMPLIED
        // >
        let lattribs = printStyleToXML(degree.degreeAlter);
        if (defined(degree.degreeAlter.plusMinus)) {
            lattribs += yesNo ` plus-minus="${degree.degreeAlter.plusMinus}"`;
        }
        let pcdata = xml `${degree.degreeAlter.data}`;
        children.push(dangerous `<degree-alter${lattribs}>${pcdata}</degree-alter>`);
    }
    if (defined(degree.degreeType)) {
        // <!ELEMENT degree-type (#PCDATA)>
        // <!ATTLIST degree-type
        //     text CDATA #IMPLIED
        //     %print-style;
        // >
        let lattribs = printStyleToXML(degree.degreeType);
        if (defined(degree.degreeType.text)) {
            lattribs += xml ` text="${degree.degreeType.text}"`;
        }
        let pcdata = xml `${degree.degreeType.data}`;
        children.push(dangerous `<degree-type${lattribs}>${pcdata}</degree-type>`);
    }
    let attribs = printObjectToXML(degree);
    return dangerous `<degree${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</degree>`;
}
function frameToXML(frame) {
    // <!ELEMENT frame
    //     (frame-strings, frame-frets, first-fret?, frame-note+)>
    // <!ATTLIST frame
    //     %position;
    //     %color;
    //     %halign;
    //     %valign-image;
    //     height  %tenths;  #IMPLIED
    //     width   %tenths;  #IMPLIED
    //     unplayed CDATA    #IMPLIED
    // >
    let attribs = positionToXML(frame) +
        colorToXML(frame) +
        halignToXML(frame) +
        valignImageToXML(frame);
    if (defined(frame.height)) {
        attribs += xml ` height="${frame.height}"`;
    }
    if (defined(frame.width)) {
        attribs += xml ` width="${frame.width}"`;
    }
    if (defined(frame.unplayed)) {
        attribs += xml ` unplayed="${frame.unplayed}"`;
    }
    let children = [];
    if (defined(frame.frameStrings)) {
        // <!ELEMENT frame-strings (#PCDATA)>
        children.push(xml `<frame-strings>${frame.frameStrings}</frame-strings>`);
    }
    if (defined(frame.frameFrets)) {
        // <!ELEMENT frame-frets (#PCDATA)>
        children.push(xml `<frame-frets>${frame.frameFrets}</frame-frets>`);
    }
    if (defined(frame.firstFret)) {
        // <!ELEMENT first-fret (#PCDATA)>
        // <!ATTLIST first-fret
        //     text CDATA #IMPLIED
        //     location %left-right; #IMPLIED
        // >
        let pcdata = xml `${frame.firstFret.data}`;
        let attribs = "";
        if (defined(frame.firstFret.text)) {
            attribs += xml ` text="${frame.firstFret.text}"`;
        }
        if (defined(frame.firstFret.location)) {
            attribs += xml ` location="${frame.firstFret.location === LeftRight.Left ? "left" : "right"}"`;
        }
    }
    (frame.frameNotes || []).forEach((frameNote) => {
        // <!ELEMENT frame-note (string, fret, fingering?, barre?)>
        let fChildren = [];
        // <!ELEMENT string (#PCDATA)>
        // <!ATTLIST string
        //     %print-style;
        //     %placement;
        // >
        if (defined(frameNote.string)) {
            let pcdata = xml `${frameNote.string.stringNum}`;
            fChildren.push(dangerous `<string${printStyleToXML(frameNote.string) + placementToXML(frameNote.string)}>${pcdata}</string>`);
        }
        // <!ELEMENT fret (#PCDATA)>
        // <!ATTLIST fret
        //     %font;
        //     %color;
        // >
        if (defined(frameNote.fret)) {
            let pcdata = xml `${frameNote.fret.fret}`;
            fChildren.push(dangerous `<fret${fontToXML(frameNote.fret) + colorToXML(frameNote.fret)}>${pcdata}</fret>`);
        }
        // <!ELEMENT fingering (#PCDATA)>
        // <!ATTLIST fingering
        //     substitution %yes-no; #IMPLIED
        //     alternate %yes-no; #IMPLIED
        //     %print-style;
        //     %placement;
        // >
        if (defined(frameNote.fingering)) {
            let pcdata = xml `${frameNote.fingering.finger}`;
            let coreAttribs = "";
            if (defined(frameNote.fingering.substitution)) {
                coreAttribs += yesNo ` substitution="${frameNote.fingering.substitution}"`;
            }
            if (defined(frameNote.fingering.alternate)) {
                coreAttribs += yesNo ` alternate="${frameNote.fingering.alternate}"`;
            }
            fChildren.push(dangerous `<fingering${coreAttribs +
                printStyleToXML(frameNote.fingering) +
                placementToXML(frameNote.fingering)}>${pcdata}</fingering>`);
        }
        // <!ELEMENT barre EMPTY>
        // <!ATTLIST barre
        //     type %start-stop; #REQUIRED
        //     %color;
        // >
        if (defined(frameNote.barre)) {
            fChildren.push(dangerous `<barre${startStopToXML(frameNote.barre) + colorToXML(frameNote.barre)} />`);
        }
        children.push(dangerous `<frame-note>\n${fChildren
            .join("\n")
            .split("\n")
            .map((n) => "  " + n)
            .join("\n")}\n</frame-note>`);
    });
    return dangerous `<frame${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</frame>`;
}
function printToXML(print) {
    // <!ELEMENT print (page-layout?, system-layout?, staff-layout*,
    //     measure-layout?, measure-numbering?, part-name-display?,
    //     part-abbreviation-display?)>
    // <!ATTLIST print
    //     staff-spacing %tenths; #IMPLIED
    //     new-system %yes-no; #IMPLIED
    //     new-page %yes-no; #IMPLIED
    //     blank-page NMTOKEN #IMPLIED
    //     page-number CDATA #IMPLIED
    // >
    let attribs = "";
    let children = [];
    children = children.concat(staffDebugInfoToXMLComment(print));
    if (defined(print.staffSpacing)) {
        attribs += xml ` staff-spacing="${print.staffSpacing}"`;
    }
    if (defined(print.newSystem)) {
        attribs += yesNo ` new-system="${print.newSystem}"`;
    }
    if (defined(print.newPage)) {
        attribs += yesNo ` new-page="${print.newPage}"`;
    }
    if (defined(print.blankPage)) {
        attribs += xml ` blank-page="${print.blankPage}"`;
    }
    if (defined(print.pageNumber)) {
        attribs += xml ` page-number="${print.pageNumber}"`;
    }
    if (defined(print.pageLayout)) {
        children.push(pageLayoutToXML(print.pageLayout));
    }
    if (defined(print.systemLayout)) {
        children.push(systemLayoutToXML(print.systemLayout));
    }
    (print.staffLayouts || []).forEach((staffLayout) => {
        children.push(staffLayoutToXML(staffLayout));
    });
    if (defined(print.measureLayout)) {
        children.push(measureLayoutToXML(print.measureLayout));
    }
    if (defined(print.measureNumbering)) {
        children.push(measureNumberingToXML(print.measureNumbering));
    }
    if (defined(print.partNameDisplay)) {
        children.push(partNameDisplayToXML(print.partNameDisplay));
    }
    if (defined(print.partAbbreviationDisplay)) {
        children.push(partAbbreviationDisplayToXML(print.partAbbreviationDisplay));
    }
    return dangerous `<print${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</print>`;
}
function soundToXML(sound) {
    // <!ELEMENT sound ((midi-device?, midi-instrument?, play?)*,
    //     offset?)>
    // <!ATTLIST sound
    //     tempo CDATA #IMPLIED
    //     dynamics CDATA #IMPLIED
    //     dacapo %yes-no; #IMPLIED
    //     segno CDATA #IMPLIED
    //     dalsegno CDATA #IMPLIED
    //     coda CDATA #IMPLIED
    //     tocoda CDATA #IMPLIED
    //     divisions CDATA #IMPLIED
    //     forward-repeat %yes-no; #IMPLIED
    //     fine CDATA #IMPLIED
    //     %time-only;
    //     pizzicato %yes-no; #IMPLIED
    //     pan CDATA #IMPLIED
    //     elevation CDATA #IMPLIED
    //     damper-pedal %yes-no-number; #IMPLIED
    //     soft-pedal %yes-no-number; #IMPLIED
    //     sostenuto-pedal %yes-no-number; #IMPLIED
    // >
    let children = [];
    let attribs = "";
    children = children.concat(staffDebugInfoToXMLComment(sound));
    // TODO musicxml-interfaces: can have many midi-devices, instruments, etc.
    (sound.midiDevices || []).forEach((midiDevice) => {
        children.push(midiDeviceToXML(midiDevice));
    });
    (sound.midiInstruments || []).forEach((midiInstrument) => {
        children.push(midiInstrumentToXML(midiInstrument));
    });
    (sound.plays || []).forEach((play) => {
        children.push(playToXML(play));
    });
    if (defined(sound.tempo)) {
        attribs += xml ` tempo="${sound.tempo}"`;
    }
    if (defined(sound.dynamics)) {
        attribs += xml ` dynamics="${sound.dynamics}"`;
    }
    if (defined(sound.decapo)) {
        attribs += yesNo ` decapo="${sound.decapo}"`;
    }
    if (defined(sound.segno)) {
        attribs += xml ` segno="${sound.segno}"`;
    }
    if (defined(sound.dalsegno)) {
        attribs += xml ` dalsegno="${sound.dalsegno}"`;
    }
    if (defined(sound.coda)) {
        attribs += xml ` coda="${sound.coda}"`;
    }
    if (defined(sound.tocoda)) {
        attribs += xml ` tocoda="${sound.tocoda}"`;
    }
    if (defined(sound.divisions)) {
        attribs += xml ` divisions="${sound.divisions}"`;
    }
    if (defined(sound.forwardRepeat)) {
        attribs += yesNo ` forward-repeat="${sound.forwardRepeat}"`;
    }
    if (defined(sound.fine)) {
        attribs += xml ` fine="${sound.fine}"`;
    }
    attribs += timeOnlyToXML(sound);
    if (defined(sound.pizzicato)) {
        attribs += yesNo ` pizzicato="${sound.pizzicato}"`;
    }
    if (defined(sound.pan)) {
        attribs += xml ` pan="${sound.pan}"`;
    }
    if (defined(sound.elevation)) {
        attribs += xml ` elevation="${sound.elevation}"`;
    }
    if (defined(sound.damperPedal)) {
        attribs += xml ` damper-pedal="${sound.damperPedal}"`;
    }
    if (defined(sound.softPedal)) {
        attribs += xml ` soft-pedal="${sound.softPedal}"`;
    }
    if (defined(sound.sostenutoPedal)) {
        attribs += xml ` sostenuto-pedal="${sound.sostenutoPedal}"`;
    }
    return dangerous `<sound${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</sound>`;
}
function staffDebugInfoToXMLComment(module) {
    let comments = [];
    if (defined(module.divCount)) {
        comments.push(xml `<!--musicxml-interfaces:debug>\n${""}  <div-count>${module.divCount}</div-count>\n${""}</musicxml-interfaces:debug-->`);
    }
    return comments;
}
/*

      <direction placement="above">
        <direction-type>
          <words default-y="15" font-family="satie-meta" relative-x="-13653" xml:space="preserve">
                {
                    "uuid": "482912"
                }
            </words>
        </direction-type>
      </direction>
*/
function directionToXML(direction) {
    // <!ELEMENT direction (direction-type+, offset?,
    //     %editorial-voice;, staff?, sound?)>
    // <!ATTLIST direction
    //     %placement;
    //     %directive;
    // >
    let children = [];
    children = children.concat(staffDebugInfoToXMLComment(direction));
    (direction.directionTypes || []).forEach((directionType) => {
        children.push(directionTypeToXML(directionType));
    });
    if (defined(direction.offset)) {
        children.push(offsetToXML(direction.offset));
    }
    children = children.concat(editorialVoiceToXML(direction));
    if (defined(direction.staff)) {
        children.push(xml `<staff>${direction.staff}</staff>`);
    }
    if (defined(direction.sound)) {
        children.push(soundToXML(direction.sound));
    }
    let attribs = "" + placementToXML(direction);
    if (defined(direction.directive)) {
        attribs += yesNo ` directive="${direction.directive}"`;
    }
    return dangerous `<direction${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</direction>`;
}
function attributesToXML(attributes) {
    // <!ELEMENT attributes (%editorial;, divisions?, key*, time*,
    //     staves?, part-symbol?, instruments?, clef*, staff-details*,
    //     transpose*, directive*, measure-style*)>
    let children = [];
    children = children.concat(staffDebugInfoToXMLComment(attributes));
    children = children.concat(editorialToXML(attributes));
    if (defined(attributes.divisions)) {
        // <!ELEMENT divisions (#PCDATA)>
        children.push(xml `<divisions>${attributes.divisions}</divisions>`);
    }
    (attributes.keySignatures || []).forEach((keySignature) => {
        children.push(keyToXML(keySignature));
    });
    (attributes.times || []).forEach((time) => {
        children.push(timeToXML(time));
    });
    if (defined(attributes.staves)) {
        // <!ELEMENT staves (#PCDATA)>
        children.push(xml `<staves>${attributes.staves}</staves>`);
    }
    if (defined(attributes.partSymbol)) {
        children.push(partSymbolToXML(attributes.partSymbol));
    }
    if (defined(attributes.instruments)) {
        // <!ELEMENT instruments (#PCDATA)>
        children.push(xml `<instruments>${attributes.instruments}</instruments>`);
    }
    (attributes.clefs || []).forEach((clef) => {
        children.push(clefToXML(clef));
    });
    (attributes.staffDetails || []).forEach((staffDetails) => {
        children.push(staffDetailsToXML(staffDetails));
    });
    (attributes.transposes || []).forEach((transpose) => {
        children.push(transposeToXML(transpose));
    });
    (attributes.directives || []).forEach((directive) => {
        children.push(directiveToXML(directive));
    });
    (attributes.measureStyles || []).forEach((measureStyle) => {
        children.push(measureStyleToXML(measureStyle));
    });
    return dangerous `<attributes>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</attributes>`;
}
let countToXML = {
    4: "quarter",
    9990: "breve",
    9991: "long",
    1024: "1024th",
    32: "32nd",
    16: "16th",
    8: "eighth",
    9992: "maxima",
    512: "512th",
    64: "64th",
    256: "256th",
    128: "128th",
    2: "half",
    1: "whole",
};
let accidentalToXML = {
    7: "natural-flat",
    13: "sharp-up",
    10: "three-quarters-flat",
    11: "three-quarters-sharp",
    8: "quarter-flat",
    2: "flat",
    18: "triple-sharp",
    27: "flat-1",
    28: "flat-2",
    29: "flat-3",
    291: "flat-4",
    191: "triple-flat",
    30: "flat-5",
    0: "sharp",
    9: "quarter-sharp",
    21: "slash-flat",
    16: "flat-down",
    14: "natural-down",
    19: "slash-quarter-sharp",
    4: "sharp-sharp",
    23: "sharp-1",
    17: "flat-up",
    24: "sharp-2",
    25: "sharp-3",
    3: "double-sharp",
    251: "sharp-4",
    26: "sharp-5",
    31: "sori",
    22: "double-slash-flat",
    12: "sharp-down",
    32: "koron",
    15: "natural-up",
    20: "slash-sharp",
    6: "natural-sharp",
    5: "flat-flat",
    1: "natural",
    33: "double-flat",
};
let syllabicTypeToXML = {
    0: "single",
    1: "begin",
    3: "middle",
    2: "end",
};
let breathMarkTypeToXML = {
    0: "comma",
    1: "tick",
    2: "empty",
};
let holeClosedTypeToXML = {
    1: "no",
    0: "yes",
    2: "half",
};
let holeLocationToXML = {
    0: "right",
    3: "top",
    1: "bottom",
    2: "left",
};
let actualBothNoneToXML = {
    [ActualBothNone.None]: "none",
    [ActualBothNone.Both]: "both",
    [ActualBothNone.Actual]: "actual",
};
let beamTypeToXML = {
    4: "backward hook",
    0: "begin",
    3: "forward hook",
    1: "continue",
    2: "end",
};
let accelRitNoneToXML = {
    0: "accel",
    2: "none",
    1: "rit",
};
let noteheadTypeToXML = {
    7: "inverted triangle",
    14: "circle dot",
    9: "arrow up",
    18: "do",
    20: "mi",
    4: "cross",
    0: "slash",
    21: "fa",
    1: "triangle",
    22: "fa up",
    23: "so",
    15: "left triangle",
    11: "back slashed",
    17: "none",
    24: "la",
    10: "slashed",
    12: "normal",
    13: "cluster",
    25: "ti",
    19: "re",
    16: "rectangle",
    3: "square",
    8: "arrow down",
    5: "x",
    2: "diamond",
    6: "circle x",
};
let stemToXML = {
    2: "none",
    3: "double",
    0: "down",
    1: "up",
};
function measureToXML(measure) {
    // <!ATTLIST measure
    //     number CDATA #REQUIRED
    //     implicit %yes-no; #IMPLIED
    //     non-controlling %yes-no; #IMPLIED
    //     width %tenths; #IMPLIED
    // >
    // <!ELEMENT measure (part+)>
    let attribs = "";
    if (defined(measure.number)) {
        attribs += xml ` number="${measure.number}"`;
    }
    if (defined(measure.implicit)) {
        attribs += yesNo ` implicit="${measure.implicit}"`;
    }
    if (defined(measure.nonControlling)) {
        attribs += yesNo ` non-controlling="${measure.nonControlling}"`;
    }
    if (defined(measure.width)) {
        attribs += xml ` width="${measure.width}"`;
    }
    let elements = [];
    for (let key in measure.parts) {
        elements.push(partToXML(measure.parts[key], key));
    }
    return dangerous `<measure${attribs}>\n${elements
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</measure>`;
}
function partToXML(part, id) {
    // <!ELEMENT part (%music-data;)>
    // <!ATTLIST part
    //     id IDREF #REQUIRED
    // >
    let attribs = xml ` id="${id}"`;
    // <!ENTITY % music-data
    //     "(note | backup | forward | direction | attributes |
    //       harmony | figured-bass | print | sound | barline |
    //       grouping | link | bookmark)*">
    let elements = part.map((element) => {
        switch (element._class) {
            case "Note":
                return noteToXML(element);
            case "Backup":
                return backupToXML(element);
            case "Forward":
                return forwardToXML(element);
            case "Direction":
                return directionToXML(element);
            case "Attributes":
                return attributesToXML(element);
            case "Harmony":
                return harmonyToXML(element);
            case "FiguredBass":
                return figuredBassToXML(element);
            case "Print":
                return printToXML(element);
            case "Sound":
                return soundToXML(element);
            case "Barline":
                return barlineToXML(element);
            case "Grouping":
                return groupingToXML(element);
            case "Link":
                return "<!-- link not implemented -->";
            case "Bookmark":
                return "<!-- bookmark not implemented -->";
            default:
                return xml `<!-- unknown type (class ${element._class}) -->`;
        }
    });
    return dangerous `<part${attribs}>\n${elements
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</part>`;
}
function noteToXML(note) {
    // <!ATTLIST note
    //     %print-style;
    //     %printout;
    //     dynamics CDATA #IMPLIED
    //     end-dynamics CDATA #IMPLIED
    //     attack CDATA #IMPLIED
    //     release CDATA #IMPLIED
    //     %time-only;
    //     pizzicato %yes-no; #IMPLIED
    // >
    let attribs = "";
    attribs += printStyleToXML(note);
    attribs += printoutToXML(note);
    if (defined(note.dynamics)) {
        attribs += xml ` dynamics="${note.dynamics}"`;
    }
    if (defined(note.endDynamics)) {
        attribs += xml ` end-dynamics="${note.endDynamics}"`;
    }
    if (defined(note.attack)) {
        attribs += xml ` attack="${note.attack}"`;
    }
    if (defined(note.release)) {
        attribs += xml ` release="${note.release}"`;
    }
    attribs += timeOnlyToXML(note);
    if (defined(note.pizzicato)) {
        attribs += yesNo ` pizzicato="${note.pizzicato}"`;
    }
    // <!ELEMENT note
    //     (((grace, %full-note;, (tie, tie?)?) |
    //     (cue, %full-note;, duration) |
    //     (%full-note;, duration, (tie, tie?)?)),
    //     ...
    let elements = [];
    if (note.grace) {
        let graceAttribs = "";
        /*
                <!ELEMENT grace EMPTY>
                <!ATTLIST grace
                    steal-time-previous CDATA #IMPLIED
                    steal-time-following CDATA #IMPLIED
                    make-time CDATA #IMPLIED
                    slash %yes-no; #IMPLIED
                >
            */
        if (note.grace.stealTimePrevious) {
            graceAttribs += xml ` steal-time-previous="${note.grace.stealTimePrevious}"`;
        }
        if (note.grace.stealTimeFollowing) {
            graceAttribs += xml ` steal-time-following="${note.grace.stealTimeFollowing}"`;
        }
        if (note.grace.makeTime) {
            graceAttribs += xml ` make-time="${note.grace.makeTime}"`;
        }
        if (note.grace.slash !== undefined && note.grace.slash !== null) {
            graceAttribs += yesNo ` slash="${note.grace.slash}"`;
        }
        elements.push(dangerous `<grace${graceAttribs} />`);
    }
    else if (note.cue) {
        elements.push(xml `<cue />`);
    }
    /*
          <!ENTITY % full-note "(chord?, (pitch | unpitched | rest))">
      */
    if (note.chord) {
        elements.push(xml `<chord />`);
    }
    if (note.pitch) {
        /*
                <!ELEMENT pitch (step, alter?, octave)>
                <!ELEMENT step (#PCDATA)>
                <!ELEMENT alter (#PCDATA)>
                <!ELEMENT octave (#PCDATA)>
            */
        let pitchElements = [];
        if (note.pitch.step) {
            pitchElements.push(xml `<step>${note.pitch.step.toUpperCase()}</step>`);
        }
        if (note.pitch.alter) {
            pitchElements.push(xml `<alter>${note.pitch.alter}</alter>`);
        }
        if (note.pitch.octave) {
            pitchElements.push(xml `<octave>${note.pitch.octave}</octave>`);
        }
        elements.push(dangerous `<pitch>\n${pitchElements
            .join("\n")
            .split("\n")
            .map((n) => "  " + n)
            .join("\n")}\n</pitch>`);
    }
    else if (note.unpitched) {
        // <!ELEMENT unpitched ((display-step, display-octave)?)>
        let upChildren = [];
        if (note.unpitched.displayStep) {
            upChildren.push(xml `<display-step>${note.unpitched.displayStep}</display-step>`);
        }
        if (note.unpitched.displayOctave) {
            upChildren.push(xml `<display-octave>${note.unpitched.displayOctave}</display-octave>`);
        }
        elements.push(dangerous `<unpitched>\n${upChildren
            .join("\n")
            .split("\n")
            .map((n) => "  " + n)
            .join("\n")}\n</unpitched>`);
    }
    else if (note.rest) {
        let restAttribs = "";
        let restChildren = [];
        if (note.rest.displayStep) {
            restChildren.push(`<display-step>${note.rest.displayStep}</display-step>`);
        }
        if (note.rest.displayOctave) {
            restChildren.push(`<display-octave>${note.rest.displayOctave}</display-octave>`);
        }
        if (note.rest.measure !== undefined && note.rest.measure !== null) {
            restAttribs += yesNo ` measure="${note.rest.measure}"`;
        }
        elements.push(dangerous `<rest${restAttribs}>\n${restChildren
            .join("\n")
            .split("\n")
            .map((n) => "  " + n)
            .join("\n")}\n</rest>`);
    }
    if (!note.grace && note.duration) {
        elements.push(xml `<duration>${note.duration}</duration>`);
    }
    if (note.ties && note.ties.length) {
        let tieAttribs = xml ` type="${note.ties[0].type === StartStop.Stop ? "stop" : "start"}"`;
        elements.push(dangerous `<tie${tieAttribs} />`);
    }
    // ...
    // instrument?, %editorial-voice;, type?, dot*,
    // ...
    if (note.instrument) {
        elements.push(xml `<instrument id="${note.instrument.id}" />`);
    }
    elements = elements.concat(editorialVoiceToXML(note));
    if (note.noteType && defined(note.noteType.duration)) {
        elements.push(xml `<type>${countToXML[note.noteType.duration]}</type>`);
    }
    (note.dots || []).forEach(() => {
        elements.push(xml `<dot />`);
    });
    // ...
    // accidental?, time-modification?, stem?, notehead?,
    // ...
    if (note.accidental) {
        let accidentalAttribs = "";
        if (note.accidental.editorial !== undefined &&
            note.accidental.editorial !== null) {
            accidentalAttribs += yesNo ` editorial="${note.accidental.editorial}"`;
        }
        if (note.accidental.cautionary !== undefined &&
            note.accidental.cautionary !== null) {
            accidentalAttribs += yesNo ` cautionary="${note.accidental.cautionary}"`;
        }
        elements.push(dangerous `<accidental${accidentalAttribs}>${accidentalToXML[note.accidental.accidental]}</accidental>`); // (safe)
    }
    if (note.timeModification) {
        let timeModificationChildren = [];
        // <!ELEMENT time-modification
        // 	(actual-notes, normal-notes,
        // 	(normal-type, normal-dot*)?)>
        // <!ELEMENT actual-notes (#PCDATA)>
        // <!ELEMENT normal-notes (#PCDATA)>
        // <!ELEMENT normal-type (#PCDATA)>
        // <!ELEMENT normal-dot EMPTY>
        if (note.timeModification.actualNotes) {
            timeModificationChildren.push(xml `<actual-notes>${note.timeModification.actualNotes}</actual-notes>`);
        }
        if (note.timeModification.normalNotes) {
            timeModificationChildren.push(xml `<normal-notes>${note.timeModification.normalNotes}</normal-notes>`);
        }
        if (note.timeModification.normalType) {
            timeModificationChildren.push(xml `<normal-type>${note.timeModification.normalType}</normal-type>`);
        }
        (note.timeModification.normalDots || []).forEach(() => {
            timeModificationChildren.push(xml `<normal-dot />`);
        });
        elements.push(dangerous `<time-modification>\n${timeModificationChildren
            .join("\n")
            .split("\n")
            .map((n) => "  " + n)
            .join("\n")}\n</time-modification>`);
    }
    if (note.stem) {
        let stemAttribs = "" + positionToXML(note.stem) + colorToXML(note.stem);
        elements.push(dangerous `<stem${stemAttribs}>${stemToXML[note.stem.type]}</stem>`); // (safe)
    }
    if (note.notehead) {
        let hattribs = "" + fontToXML(note.notehead) + colorToXML(note.notehead);
        if (defined(note.notehead.filled)) {
            hattribs += yesNo ` filled="${note.notehead.filled}"`;
        }
        if (defined(note.notehead.parentheses)) {
            hattribs += yesNo ` parentheses="${note.notehead.parentheses}"`;
        }
        elements.push(dangerous `<notehead${hattribs}>${noteheadTypeToXML[note.notehead.type]}</notehead>`);
    }
    // ...
    // notehead-text?, staff?, beam*, notations*, lyric*, play?)>
    // ...
    if (defined(note.noteheadText)) {
        // <!ELEMENT notehead-text
        //     ((display-text | accidental-text)+)>
        elements = elements.concat(textArrayToXML(note.noteheadText.text));
    }
    if (!isNaN(note.staff)) {
        elements.push(xml `<staff>${note.staff}</staff>`);
    }
    (note.beams || []).forEach((beam) => {
        let beamAttribs = xml ` number="${beam.number}"`;
        if (defined(beam.repeater)) {
            beamAttribs += yesNo ` repeater="${beam.repeater}"`;
        }
        if (defined(beam.fan)) {
            beamAttribs += xml ` fan="${accelRitNoneToXML[beam.fan]}"`;
        }
        elements.push(dangerous `<beam${beamAttribs}>${beamTypeToXML[beam.type]}</beam>`); // safe
    });
    (note.notations || []).forEach((notation) => {
        /**
         * <!ELEMENT notations
         *      (%editorial;,
         *       (tied | slur | tuplet | glissando | slide |
         *        ornaments | technical | articulations | dynamics |
         *        fermata | arpeggiate | non-arpeggiate |
         *        accidental-mark | other-notation)*)>
         *  <!ATTLIST notations
         *      %print-object;
         *  >
         *
         *  <!ENTITY % print-object
         *      "print-object  %yes-no;  #IMPLIED">
         *  <!ENTITY % editorial "(footnote?, level?)">
         */
        let notationsAttribs = "";
        let nChildren = [];
        if (defined(notation.printObject)) {
            notationsAttribs += yesNo ` print-object="${notation.printObject}"`;
        }
        nChildren = nChildren.concat(editorialToXML(notation));
        (notation.tieds || []).forEach((tied) => {
            // <!ATTLIST tied
            //     type %start-stop-continue; #REQUIRED
            //     number %number-level; #IMPLIED
            //     %line-type;
            //     %dashed-formatting;
            //     %position;
            //     %placement;
            //     %orientation;
            //     %bezier;
            //     %color;
            // >
            nChildren.push(dangerous `<tied${startStopContinueToXML(tied) +
                numberLevelToXML(tied) +
                lineTypeToXML(tied) +
                dashedFormattingToXML(tied) +
                positionToXML(tied) +
                placementToXML(tied) +
                orientationToXML(tied) +
                bezierToXML(tied) +
                colorToXML(tied)} />`);
        });
        (notation.slurs || []).forEach((slur) => {
            // <!ATTLIST slur
            //     type %start-stop-continue; #REQUIRED
            //     number %number-level; "1"
            //     %line-type;
            //     %dashed-formatting;
            //     %position;
            //     %placement;
            //     %orientation;
            //     %bezier;
            //     %color;
            // >
            nChildren.push(dangerous `<slur${startStopContinueToXML(slur) +
                numberLevelToXML(slur) +
                lineTypeToXML(slur) +
                dashedFormattingToXML(slur) +
                positionToXML(slur) +
                placementToXML(slur) +
                orientationToXML(slur) +
                bezierToXML(slur) +
                colorToXML(slur)} />`);
        });
        (notation.tuplets || []).forEach((tuplet) => {
            // <!ELEMENT tuplet (tuplet-actual?, tuplet-normal?)>
            // <!ATTLIST tuplet
            //     type %start-stop; #REQUIRED
            //     number %number-level; #IMPLIED
            //     bracket %yes-no; #IMPLIED
            //     show-number (actual | both | none) #IMPLIED
            //     show-type (actual | both | none) #IMPLIED
            //     %line-shape;
            //     %position;
            //     %placement;
            // >
            // <!ELEMENT tuplet-actual (tuplet-number?,
            //     tuplet-type?, tuplet-dot*)>
            // <!ELEMENT tuplet-normal (tuplet-number?,
            //     tuplet-type?, tuplet-dot*)>
            // <!ELEMENT tuplet-number (#PCDATA)>
            // <!ATTLIST tuplet-number
            //     %font;
            //     %color;
            // >
            // <!ELEMENT tuplet-type (#PCDATA)>
            // <!ATTLIST tuplet-type
            //     %font;
            //     %color;
            // >
            // <!ELEMENT tuplet-dot EMPTY>
            // <!ATTLIST tuplet-dot
            //     %font;
            //     %color;
            // >
            let tattribs = "" + startStopToXML(tuplet) + numberLevelToXML(tuplet);
            if (defined(tuplet.bracket)) {
                tattribs += yesNo ` bracket="${tuplet.bracket}"`;
            }
            if (defined(tuplet.showNumber)) {
                tattribs += xml ` show-number="${actualBothNoneToXML[tuplet.showNumber]}"`;
            }
            if (defined(tuplet.showType)) {
                tattribs += xml ` show-type="${actualBothNoneToXML[tuplet.showType]}"`;
            }
            tattribs += lineShapeToXML(tuplet);
            tattribs += positionToXML(tuplet);
            tattribs += placementToXML(tuplet);
            let tChildren = [];
            [
                ["tuplet-actual", "tupletActual"],
                ["tuplet-normal", "tupletNormal"],
            ].forEach((tup) => {
                let data = tuplet[tup[1]];
                if (!data) {
                    return;
                }
                let dataChildren = [];
                if (data.tupletNumber) {
                    let num = data.tupletNumber;
                    let pcdata = xml `${num.text}`;
                    dataChildren.push(dangerous `<tuplet-number${fontToXML(num) + colorToXML(num)}>${pcdata}</tuplet-number>`);
                }
                if (data.tupletType) {
                    let type = data.tupletType;
                    let pcdata = xml `${type.text}`;
                    dataChildren.push(dangerous `<tuplet-type${fontToXML(type) + colorToXML(type)}>${pcdata}</tuplet-type>`);
                }
                (data.tupletDots || []).forEach((dot) => {
                    dataChildren.push(dangerous `<tuplet-dot${fontToXML(dot) + colorToXML(dot)} />`);
                });
                tChildren.push(dangerous `<${tup[0]}>\n${dataChildren
                    .join("\n")
                    .split("\n")
                    .map((n) => "  " + n)
                    .join("\n")}\n</${tup[0]}>`);
            });
            nChildren.push(dangerous `<tuplet${tattribs}>\n${tChildren
                .join("\n")
                .split("\n")
                .map((n) => "  " + n)
                .join("\n")}\n</tuplet>`);
        });
        (notation.glissandos || []).forEach((glissando) => {
            // <!ELEMENT glissando (#PCDATA)>
            // <!ATTLIST glissando
            //     type %start-stop; #REQUIRED
            //     number %number-level; "1"
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            // >
            let pcdata = xml `${glissando.text}`;
            nChildren.push(dangerous `<glissando${startStopToXML(glissando) +
                numberLevelToXML(glissando) +
                lineTypeToXML(glissando) +
                dashedFormattingToXML(glissando) +
                printStyleToXML(glissando)}>${pcdata}</glissando>`);
        });
        (notation.slides || []).forEach((slide) => {
            // <!ELEMENT slide (#PCDATA)>
            // <!ATTLIST slide
            //     type %start-stop; #REQUIRED
            //     number %number-level; "1"
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            //     %bend-sound;
            // >
            let pcdata = xml `${slide.text}`;
            nChildren.push(dangerous `<slide${startStopToXML(slide) +
                numberLevelToXML(slide) +
                lineTypeToXML(slide) +
                dashedFormattingToXML(slide) +
                printStyleToXML(slide) +
                bendSoundToXML(slide)}>${pcdata}</slide>`);
        });
        (notation.ornaments || []).forEach((ornaments) => {
            // <!ELEMENT ornaments
            //     (((trill-mark | turn | delayed-turn | inverted-turn |
            //        delayed-inverted-turn | vertical-turn | shake |
            //        wavy-line | mordent | inverted-mordent | schleifer |
            //        tremolo | other-ornament), accidental-mark*)*)>
            let oChildren = [];
            // <!ELEMENT trill-mark EMPTY>
            // <!ATTLIST trill-mark
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            // >
            if (ornaments.trillMark) {
                oChildren.push(dangerous `<trill-mark${printStyleToXML(ornaments.trillMark) +
                    placementToXML(ornaments.trillMark) +
                    trillSoundToXML(ornaments.trillMark)} />`);
            }
            // <!ATTLIST turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            //     slash %yes-no; #IMPLIED
            // >
            if (ornaments.turn) {
                oChildren.push(dangerous `<turn${printStyleToXML(ornaments.turn) +
                    placementToXML(ornaments.turn) +
                    trillSoundToXML(ornaments.turn) +
                    slashToXML(ornaments.turn)} />`);
            }
            // <!ATTLIST delayed-turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            //     slash %yes-no; #IMPLIED
            // >
            if (ornaments.delayedTurn) {
                oChildren.push(dangerous `<delayed-turn${printStyleToXML(ornaments.delayedTurn) +
                    placementToXML(ornaments.delayedTurn) +
                    trillSoundToXML(ornaments.delayedTurn) +
                    slashToXML(ornaments.delayedTurn)} />`);
            }
            // <!ATTLIST inverted-turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            //     slash %yes-no; #IMPLIED
            // >
            if (ornaments.invertedTurn) {
                oChildren.push(dangerous `<inverted-turn${printStyleToXML(ornaments.invertedTurn) +
                    placementToXML(ornaments.invertedTurn) +
                    trillSoundToXML(ornaments.invertedTurn) +
                    slashToXML(ornaments.invertedTurn)} />`);
            }
            // <!ATTLIST delayed-inverted-turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            //     slash %yes-no; #IMPLIED
            // >
            if (ornaments.delayedInvertedTurn) {
                oChildren.push(dangerous `<delayed-inverted-turn${printStyleToXML(ornaments.delayedInvertedTurn) +
                    placementToXML(ornaments.delayedInvertedTurn) +
                    trillSoundToXML(ornaments.delayedInvertedTurn) +
                    slashToXML(ornaments.delayedInvertedTurn)} />`);
            }
            // <!ATTLIST vertical-turn
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            // >
            if (ornaments.verticalTurn) {
                oChildren.push(dangerous `<vertical-turn${printStyleToXML(ornaments.verticalTurn) +
                    placementToXML(ornaments.verticalTurn) +
                    trillSoundToXML(ornaments.verticalTurn)} />`);
            }
            //
            // <!ATTLIST shake
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            // >
            if (ornaments.shake) {
                oChildren.push(dangerous `<shake${printStyleToXML(ornaments.shake) +
                    placementToXML(ornaments.shake) +
                    trillSoundToXML(ornaments.shake)} />`);
            }
            //
            // <!ATTLIST mordent
            //     long %yes-no; #IMPLIED
            //     approach %above-below; #IMPLIED
            //     departure %above-below; #IMPLIED
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            // >
            if (ornaments.mordent) {
                oChildren.push(dangerous `<mordent${mordentSubsetToXML(ornaments.mordent) +
                    printStyleToXML(ornaments.mordent) +
                    placementToXML(ornaments.mordent) +
                    trillSoundToXML(ornaments.mordent)} />`);
            }
            // <!ATTLIST inverted-mordent
            //     long %yes-no; #IMPLIED
            //     approach %above-below; #IMPLIED
            //     departure %above-below; #IMPLIED
            //     %print-style;
            //     %placement;
            //     %trill-sound;
            // >
            if (ornaments.invertedMordent) {
                oChildren.push(dangerous `<inverted-mordent${mordentSubsetToXML(ornaments.invertedMordent) +
                    printStyleToXML(ornaments.invertedMordent) +
                    placementToXML(ornaments.invertedMordent) +
                    trillSoundToXML(ornaments.invertedMordent)} />`);
            }
            //
            // <!ATTLIST schleifer
            //     %print-style;
            //     %placement;
            // >
            if (ornaments.schleifer) {
                oChildren.push(dangerous `<schleifer${printStyleToXML(ornaments.schleifer) +
                    placementToXML(ornaments.schleifer)} />`);
            }
            //
            // <!ELEMENT tremolo (#PCDATA)>
            // <!ATTLIST tremolo
            //     type %start-stop-single; "single"
            //     %print-style;
            //     %placement;
            // >
            if (ornaments.tremolo) {
                let pcdata = xml `${ornaments.tremolo.data || ""}`;
                oChildren.push(dangerous `<tremolo${startStopSingleToXML(ornaments.tremolo) +
                    printStyleToXML(ornaments.tremolo) +
                    placementToXML(ornaments.tremolo)}>${pcdata}</tremolo>`);
            }
            //
            // <!ELEMENT other-ornament (#PCDATA)>
            // <!ATTLIST other-ornament
            //     %print-style;
            //     %placement;
            // >
            if (ornaments.otherOrnament) {
                let pcdata = xml `${ornaments.otherOrnament.data || ""}`;
                oChildren.push(dangerous `<other-ornament${printStyleToXML(ornaments.otherOrnament) +
                    placementToXML(ornaments.otherOrnament)}>${pcdata}</other-ornament>`);
            }
            //
            // <!ELEMENT accidental-mark (#PCDATA)>
            // <!ATTLIST accidental-mark
            //     %print-style;
            //     %placement;
            // >
            (ornaments.accidentalMarks || []).forEach((accidentalMark) => {
                let pcdata = xml `${accidentalMark.mark || ""}`;
                oChildren.push(dangerous `<accidental-mark${printStyleToXML(accidentalMark) + placementToXML(accidentalMark)}>${pcdata}</accidental-mark>`);
            });
            nChildren.push(dangerous `<ornaments>\n${oChildren
                .join("\n")
                .split("\n")
                .map((n) => "  " + n)
                .join("\n")}\n</ornaments>`);
        });
        (notation.technicals || []).forEach((technical) => {
            let oChildren = [];
            // <!ELEMENT technical
            //     ((up-bow | down-bow | harmonic | open-string |
            //       thumb-position | fingering | pluck | double-tongue |
            //       triple-tongue | stopped | snap-pizzicato | fret |
            //       string | hammer-on | pull-off | bend | tap | heel |
            //       toe | fingernails | hole | arrow | handbell |
            //       other-technical)*)>
            //
            // <!ATTLIST up-bow
            //     %print-style;
            //     %placement;
            // >
            if (technical.upBow) {
                oChildren.push(dangerous `<up-bow${printStyleToXML(technical.upBow) + placementToXML(technical.upBow)} />`);
            }
            // <!ATTLIST down-bow
            //     %print-style;
            //     %placement;
            // >
            if (technical.downBow) {
                oChildren.push(dangerous `<down-bow${printStyleToXML(technical.downBow) +
                    placementToXML(technical.downBow)} />`);
            }
            // <!ELEMENT harmonic
            //     ((natural | artificial)?,
            //      (base-pitch | touching-pitch | sounding-pitch)?)>
            // <!ATTLIST harmonic
            //     %print-object;
            //     %print-style;
            //     %placement;
            // >
            if (technical.harmonic) {
                let hChildren = [];
                // <!ELEMENT natural EMPTY>
                // <!ELEMENT artificial EMPTY>
                // <!ELEMENT base-pitch EMPTY>
                // <!ELEMENT touching-pitch EMPTY>
                // <!ELEMENT sounding-pitch EMPTY>
                if (technical.harmonic.natural) {
                    hChildren.push(xml `<natural />`);
                }
                if (technical.harmonic.artificial) {
                    hChildren.push(xml `<artificial />`);
                }
                if (technical.harmonic.basePitch) {
                    hChildren.push(xml `<base-pitch />`);
                }
                if (technical.harmonic.touchingPitch) {
                    hChildren.push(xml `<touching-pitch />`);
                }
                if (technical.harmonic.soundingPitch) {
                    hChildren.push(xml `<sounding-pitch />`);
                }
                oChildren.push(dangerous `<harmonic${printObjectToXML(technical.harmonic) +
                    printStyleToXML(technical.harmonic) +
                    placementToXML(technical.harmonic)}>${hChildren
                    .join("\n")
                    .split("\n")
                    .map((n) => "  " + n)
                    .join("\n")}\n</harmonic>`);
            }
            // <!ATTLIST open-string
            //     %print-style;
            //     %placement;
            // >
            if (technical.openString) {
                oChildren.push(dangerous `<open-string${printStyleToXML(technical.openString) +
                    placementToXML(technical.openString)} />`);
            }
            //
            // <!ATTLIST thumb-position
            //     %print-style;
            //     %placement;
            // >
            if (technical.thumbPosition) {
                oChildren.push(dangerous `<thumb-position${printStyleToXML(technical.thumbPosition) +
                    placementToXML(technical.thumbPosition)} />`);
            }
            //
            // <!ELEMENT fingering (#PCDATA)>
            // <!ATTLIST fingering
            //     substitution %yes-no; #IMPLIED
            //     alternate %yes-no; #IMPLIED
            //     %print-style;
            //     %placement;
            // >
            //
            if (technical.fingering) {
                let substitution = "";
                if (defined(technical.fingering.substitution)) {
                    substitution += yesNo ` substitution="${technical.fingering.substitution}"`;
                }
                let alternate = "";
                if (defined(technical.fingering.alternate)) {
                    alternate += yesNo ` alternate="${technical.fingering.alternate}"`;
                }
                oChildren.push(dangerous `<fingering${substitution +
                    alternate +
                    printStyleToXML(technical.fingering) +
                    placementToXML(technical.fingering)}>${String(parseInt(String(technical.fingering.finger), 10))}</fingering>`);
            }
            //
            // <!ELEMENT pluck (#PCDATA)>
            // <!ATTLIST pluck
            //     %print-style;
            //     %placement;
            // >
            if (technical.pluck) {
                oChildren.push(dangerous `<pluck${printStyleToXML(technical.pluck) + placementToXML(technical.pluck)} />`);
            }
            //
            // <!ATTLIST double-tongue
            //     %print-style;
            //     %placement;
            // >
            if (technical.doubleTongue) {
                oChildren.push(dangerous `<double-tongue${printStyleToXML(technical.doubleTongue) +
                    placementToXML(technical.doubleTongue)} />`);
            }
            //
            // <!ATTLIST triple-tongue
            //     %print-style;
            //     %placement;
            // >
            if (technical.tripleTongue) {
                oChildren.push(dangerous `<triple-tongue${printStyleToXML(technical.tripleTongue) +
                    placementToXML(technical.tripleTongue)} />`);
            }
            //
            // <!ATTLIST stopped
            //     %print-style;
            //     %placement;
            // >
            if (technical.stopped) {
                oChildren.push(dangerous `<stopped${printStyleToXML(technical.stopped) +
                    placementToXML(technical.stopped)} />`);
            }
            //
            // <!ATTLIST snap-pizzicato
            //     %print-style;
            //     %placement;
            // >
            if (technical.snapPizzicato) {
                oChildren.push(dangerous `<snap-pizzicato${printStyleToXML(technical.snapPizzicato) +
                    placementToXML(technical.snapPizzicato)} />`);
            }
            //
            // <!ELEMENT hammer-on (#PCDATA)>
            // <!ATTLIST hammer-on
            //     type %start-stop; #REQUIRED
            //     number %number-level; "1"
            //     %print-style;
            //     %placement;
            // >
            if (technical.hammerOn) {
                let pcdata = xml `${technical.hammerOn.data}`;
                oChildren.push(dangerous `<hammer-on${startStopToXML(technical.hammerOn) +
                    numberLevelToXML(technical.hammerOn) +
                    printStyleToXML(technical.hammerOn) +
                    placementToXML(technical.hammerOn)}>${pcdata}</hammer-on>`);
            }
            // <!ELEMENT pull-off (#PCDATA)>
            // <!ATTLIST pull-off
            //     type %start-stop; #REQUIRED
            //     number %number-level; "1"
            //     %print-style;
            //     %placement;
            // >
            if (technical.pullOff) {
                let pcdata = xml `${technical.pullOff.data}`;
                oChildren.push(dangerous `<pull-off${startStopToXML(technical.pullOff) +
                    numberLevelToXML(technical.pullOff) +
                    printStyleToXML(technical.pullOff) +
                    placementToXML(technical.pullOff)}>${pcdata}</pull-off>`);
            }
            //
            // <!ELEMENT bend
            //     (bend-alter, (pre-bend | release)?, with-bar?)>
            // <!ATTLIST bend
            //     %print-style;
            //     %bend-sound;
            // >
            // <!ELEMENT bend-alter (#PCDATA)>
            // <!ELEMENT pre-bend EMPTY>
            // <!ELEMENT release EMPTY>
            // <!ELEMENT with-bar (#PCDATA)>
            // <!ATTLIST with-bar
            //     %print-style;
            //     %placement;
            // >
            if (technical.bend) {
                let bendChildren = [];
                if (defined(technical.bend.bendAlter)) {
                    bendChildren.push(xml `<bend-alter>${technical.bend.bendAlter}</bend-alter>`);
                }
                if (defined(technical.bend.preBend)) {
                    bendChildren.push(xml `<pre-bend />`);
                }
                else if (defined(technical.bend.release)) {
                    bendChildren.push(xml `<release />`);
                }
                if (defined(technical.bend.withBar)) {
                    let pcdata = xml `${technical.bend.withBar.data}`;
                    bendChildren.push(dangerous `<with-bar${printStyleToXML(technical.bend.withBar) +
                        placementToXML(technical.bend.withBar)}>${pcdata}</with-bar>`);
                }
                oChildren.push(dangerous `<bend${printStyleToXML(technical.bend) + bendSoundToXML(technical.bend)}>\n${bendChildren
                    .join("\n")
                    .split("\n")
                    .map((n) => "  " + n)
                    .join("\n")}\n</bend>`);
            }
            //
            // <!ELEMENT tap (#PCDATA)>
            // <!ATTLIST tap
            //     %print-style;
            //     %placement;
            // >
            if (technical.tap) {
                let pcdata = xml `${technical.tap.data}`;
                oChildren.push(dangerous `<tap${printStyleToXML(technical.tap) + placementToXML(technical.tap)}>${pcdata}</tap>`);
            }
            //
            // <!ATTLIST heel
            //     substitution %yes-no; #IMPLIED
            //     %print-style;
            //     %placement;
            // >
            if (technical.heel) {
                let substitution = "";
                if (defined(technical.heel.substitution)) {
                    substitution += yesNo ` substitution="${technical.heel.substitution}"`;
                }
                oChildren.push(dangerous `<heel${substitution +
                    printStyleToXML(technical.heel) +
                    placementToXML(technical.heel)} />`);
            }
            // <!ATTLIST toe
            //     substitution %yes-no; #IMPLIED
            //     %print-style;
            //     %placement;
            // >
            if (technical.toe) {
                let substitution = "";
                if (defined(technical.toe.substitution)) {
                    substitution += yesNo ` substitution="${technical.toe.substitution}"`;
                }
                oChildren.push(dangerous `<toe${substitution +
                    printStyleToXML(technical.toe) +
                    placementToXML(technical.toe)} />`);
            }
            //
            // <!ATTLIST fingernails
            //     %print-style;
            //     %placement;
            // >
            if (technical.fingernails) {
                oChildren.push(dangerous `<fingernails${printStyleToXML(technical.fingernails) +
                    placementToXML(technical.fingernails)} />`);
            }
            //
            // <!ELEMENT hole (hole-type?, hole-closed, hole-shape?)>
            // <!ATTLIST hole
            //     %print-style;
            //     %placement;
            // >
            // <!ELEMENT hole-type (#PCDATA)>
            // <!ELEMENT hole-closed (#PCDATA)>
            // <!ATTLIST hole-closed
            //     location (right | bottom | left | top) #IMPLIED
            // >
            // <!ELEMENT hole-shape (#PCDATA)>
            if (technical.hole) {
                let holeChildren = [];
                if (defined(technical.hole.holeType)) {
                    holeChildren.push(xml `<hole-type>${technical.hole.holeType}</hole-type>`);
                }
                if (defined(technical.hole.holeClosed)) {
                    let holeClosedAttribs = "";
                    if (defined(technical.hole.holeClosed.location)) {
                        holeClosedAttribs = xml ` location="${holeLocationToXML[technical.hole.holeClosed.location]}"`;
                    }
                    holeChildren.push(dangerous `<hole-closed${holeClosedAttribs}>${holeClosedTypeToXML[technical.hole.holeClosed.data]}</hole-closed>`);
                }
                if (defined(technical.hole.holeShape)) {
                    holeChildren.push(xml `<hole-shape>${technical.hole.holeShape}</hole-shape>`);
                }
                oChildren.push(dangerous `<hole${printStyleToXML(technical.hole) + placementToXML(technical.hole)}>${holeChildren
                    .join("\n")
                    .split("\n")
                    .map((n) => "  " + n)
                    .join("\n")}\n</hole>`);
            }
            //
            // <!ELEMENT arrow
            //     ((arrow-direction, arrow-style?) | circular-arrow)>
            // <!ATTLIST arrow
            //     %print-style;
            //     %placement;
            // >
            // <!ELEMENT arrow-direction (#PCDATA)>
            // <!ELEMENT arrow-style (#PCDATA)>
            // <!ELEMENT circular-arrow (#PCDATA)>
            if (technical.arrow) {
                let arrowChildren = [];
                if (defined(technical.arrow.arrowDirection)) {
                    arrowChildren.push(xml `<arrow-direction>
                        ${technical.arrow.arrowDirection}</arrow-direction>`);
                }
                if (defined(technical.arrow.arrowStyle)) {
                    arrowChildren.push(xml `<arrow-style>
                        ${technical.arrow.arrowStyle}</arrow-style>`);
                }
                if (defined(technical.arrow.circularArrow)) {
                    arrowChildren.push(xml `<circular-arrow>
                        ${technical.arrow.circularArrow}</circular-arrow>`);
                }
                oChildren.push(dangerous `<arrow${printStyleToXML(technical.arrow) + placementToXML(technical.arrow)}>${arrowChildren
                    .join("\n")
                    .split("\n")
                    .map((n) => "  " + n)
                    .join("\n")}\n</arrow>`);
            }
            //
            // <!ELEMENT handbell (#PCDATA)>
            // <!ATTLIST handbell
            //     %print-style;
            //     %placement;
            // >
            if (technical.handbell) {
                let pcdata = xml `${technical.handbell.data}`;
                oChildren.push(dangerous `<handbell${printStyleToXML(technical.handbell) +
                    placementToXML(technical.handbell)}>${pcdata}</handbell>`);
            }
            //
            // <!ELEMENT other-technical (#PCDATA)>
            // <!ATTLIST other-technical
            //     %print-style;
            //     %placement;
            // >
            if (technical.otherTechnical) {
                let pcdata = xml `${technical.otherTechnical.data}`;
                oChildren.push(dangerous `<other-technical${printStyleToXML(technical.otherTechnical) +
                    placementToXML(technical.otherTechnical)}>${pcdata}</other-technical>`);
            }
            nChildren.push(dangerous `<technical>\n${oChildren
                .join("\n")
                .split("\n")
                .map((n) => "  " + n)
                .join("\n")}\n</technical>`);
        });
        (notation.articulations || []).forEach((articulation) => {
            let oChildren = [];
            // <!ELEMENT articulations
            //     ((accent | strong-accent | staccato | tenuto |
            //       detached-legato | staccatissimo | spiccato |
            //       scoop | plop | doit | falloff | breath-mark |
            //       caesura | stress | unstress | other-articulation)*)>
            //
            // <!ATTLIST accent
            //     %print-style;
            //     %placement;
            // >
            if (articulation.accent) {
                oChildren.push(dangerous `<accent${printStyleToXML(articulation.accent) +
                    placementToXML(articulation.accent)} />`);
            }
            // <!ATTLIST strong-accent
            //     %print-style;
            //     %placement;
            //     type %up-down; "up"
            // >
            if (articulation.strongAccent) {
                oChildren.push(dangerous `<strong-accent${printStyleToXML(articulation.strongAccent) +
                    placementToXML(articulation.strongAccent) +
                    upDownToXML(articulation.strongAccent)} />`);
            }
            //
            // <!ATTLIST staccato
            //     %print-style;
            //     %placement;
            // >
            if (articulation.staccato) {
                oChildren.push(dangerous `<staccato${printStyleToXML(articulation.staccato) +
                    placementToXML(articulation.staccato)} />`);
            }
            // <!ATTLIST tenuto
            //     %print-style;
            //     %placement;
            // >
            if (articulation.tenuto) {
                oChildren.push(dangerous `<tenuto${printStyleToXML(articulation.tenuto) +
                    placementToXML(articulation.tenuto)} />`);
            }
            // <!ATTLIST detached-legato
            //     %print-style;
            //     %placement;
            // >
            if (articulation.detachedLegato) {
                oChildren.push(dangerous `<detached-legato${printStyleToXML(articulation.detachedLegato) +
                    placementToXML(articulation.detachedLegato)} />`);
            }
            //
            // <!ATTLIST staccatissimo
            //     %print-style;
            //     %placement;
            // >
            if (articulation.staccatissimo) {
                oChildren.push(dangerous `<staccatissimo${printStyleToXML(articulation.staccatissimo) +
                    placementToXML(articulation.staccatissimo)} />`);
            }
            //
            // <!ATTLIST spiccato
            //     %print-style;
            //     %placement;
            // >
            if (articulation.spiccato) {
                oChildren.push(dangerous `<spiccato${printStyleToXML(articulation.spiccato) +
                    placementToXML(articulation.spiccato)} />`);
            }
            //
            // <!ATTLIST scoop
            //     %line-shape;
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            //     %placement;
            // >
            if (articulation.scoop) {
                oChildren.push(dangerous `<scoop${lineShapeToXML(articulation.scoop) +
                    lineTypeToXML(articulation.scoop) +
                    dashedFormattingToXML(articulation.scoop) +
                    printStyleToXML(articulation.scoop) +
                    placementToXML(articulation.scoop)} />`);
            }
            // <!ATTLIST plop
            //     %line-shape;
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            //     %placement;
            // >
            if (articulation.plop) {
                oChildren.push(dangerous `<plop${lineShapeToXML(articulation.plop) +
                    lineTypeToXML(articulation.plop) +
                    dashedFormattingToXML(articulation.plop) +
                    printStyleToXML(articulation.plop) +
                    placementToXML(articulation.plop)} />`);
            }
            // <!ATTLIST doit
            //     %line-shape;
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            //     %placement;
            // >
            if (articulation.doit) {
                oChildren.push(dangerous `<doit${lineShapeToXML(articulation.doit) +
                    lineTypeToXML(articulation.doit) +
                    dashedFormattingToXML(articulation.doit) +
                    printStyleToXML(articulation.doit) +
                    placementToXML(articulation.doit)} />`);
            }
            // <!ATTLIST falloff
            //     %line-shape;
            //     %line-type;
            //     %dashed-formatting;
            //     %print-style;
            //     %placement;
            // >
            if (articulation.falloff) {
                oChildren.push(dangerous `<falloff${lineShapeToXML(articulation.falloff) +
                    lineTypeToXML(articulation.falloff) +
                    dashedFormattingToXML(articulation.falloff) +
                    printStyleToXML(articulation.falloff) +
                    placementToXML(articulation.falloff)} />`);
            }
            //
            // <!ELEMENT breath-mark (#PCDATA)>
            // <!ATTLIST breath-mark
            //     %print-style;
            //     %placement;
            // >
            if (articulation.breathMark) {
                let pcdata = xml `${breathMarkTypeToXML[articulation.breathMark.type]}`;
                oChildren.push(dangerous `<breath-mark${printStyleToXML(articulation.breathMark) +
                    placementToXML(articulation.breathMark)}>${pcdata}</breath-mark>`);
            }
            //
            // <!ATTLIST caesura
            //     %print-style;
            //     %placement;
            // >
            if (articulation.caesura) {
                oChildren.push(dangerous `<caesura${printStyleToXML(articulation.caesura) +
                    placementToXML(articulation.caesura)} />`);
            }
            // <!ATTLIST stress
            //     %print-style;
            //     %placement;
            // >
            if (articulation.stress) {
                oChildren.push(dangerous `<stress${printStyleToXML(articulation.stress) +
                    placementToXML(articulation.stress)} />`);
            }
            // <!ATTLIST unstress
            //     %print-style;
            //     %placement;
            // >
            if (articulation.unstress) {
                oChildren.push(dangerous `<unstress${printStyleToXML(articulation.unstress) +
                    placementToXML(articulation.unstress)} />`);
            }
            // <!ELEMENT other-articulation (#PCDATA)>
            // <!ATTLIST other-articulation
            //     %print-style;
            //     %placement;
            // >
            (articulation.otherArticulations || []).forEach((articulation) => {
                let pcdata = xml `${articulation.data}`;
                oChildren.push(dangerous `<other-articulation${printStyleToXML(articulation) + placementToXML(articulation)}>${pcdata}</other-articulation>`);
            });
            nChildren.push(dangerous `<articulations>\n${oChildren
                .join("\n")
                .split("\n")
                .map((n) => "  " + n)
                .join("\n")}\n</articulations>`);
        });
        (notation.dynamics || []).forEach((dynamics) => {
            nChildren.push(dynamicsToXML(dynamics));
        });
        (notation.fermatas || []).forEach((fermata) => {
            nChildren.push(fermataToXML(fermata));
        });
        (notation.arpeggiates || []).forEach((arpeggiate) => {
            // <!ATTLIST arpeggiate
            //     number %number-level; #IMPLIED
            //     direction %up-down; #IMPLIED
            //     %position;
            //     %placement;
            //     %color;
            // >
            nChildren.push(dangerous `<arpeggiate${numberLevelToXML(arpeggiate) +
                upDownDirectionToXML(arpeggiate) +
                positionToXML(arpeggiate) +
                placementToXML(arpeggiate) +
                colorToXML(arpeggiate)} />`);
        });
        (notation.nonArpeggiates || []).forEach((nonArpeggiate) => {
            // <!ATTLIST non-arpeggiate
            //     type %top-bottom; #REQUIRED
            //     number %number-level; #IMPLIED
            //     %position;
            //     %placement;
            //     %color;
            // >
            nChildren.push(dangerous `<non-arpeggiate${topBottomToXML(nonArpeggiate) +
                numberLevelToXML(nonArpeggiate) +
                positionToXML(nonArpeggiate) +
                placementToXML(nonArpeggiate) +
                colorToXML(nonArpeggiate)} />`);
        });
        (notation.accidentalMarks || []).forEach((accidentalMark) => {
            // <!ELEMENT accidental-mark (#PCDATA)>
            // <!ATTLIST accidental-mark
            //     %print-style;
            //     %placement;
            // >
            let pcdata = xml `${accidentalMark.mark}`;
            nChildren.push(dangerous `<accidental-mark${printStyleToXML(accidentalMark) + placementToXML(accidentalMark)}>${pcdata}</accidental-mark>`);
        });
        (notation.otherNotations || []).forEach((otherNotation) => {
            // <!ELEMENT other-notation (#PCDATA)>
            // <!ATTLIST other-notation
            //     type %start-stop-single; #REQUIRED
            //     number %number-level; "1"
            //     %print-object;
            //     %print-style;
            //     %placement;
            // >
            let pcdata = xml `${otherNotation.data}`;
            nChildren.push(dangerous `<other-notation${startStopSingleToXML(otherNotation) +
                numberLevelToXML(otherNotation) +
                printObjectToXML(otherNotation) +
                printStyleToXML(otherNotation) +
                placementToXML(otherNotation)}>${pcdata}</other-notation>`);
        });
        elements.push(dangerous `<notations${notationsAttribs}>\n${nChildren
            .join("\n")
            .split("\n")
            .map((n) => "  " + n)
            .join("\n")}\n</notations>`);
    });
    (note.lyrics || []).forEach((lyric) => {
        // <!ELEMENT lyric
        //     ((((syllabic?, text),
        //        (elision?, syllabic?, text)*, extend?) |
        //        extend | laughing | humming),
        //       end-line?, end-paragraph?, %editorial;)>
        // <!ATTLIST lyric
        //     number NMTOKEN #IMPLIED
        //     name CDATA #IMPLIED
        //     %justify;
        //     %position;
        //     %placement;
        //     %color;
        //     %print-object;
        // >
        // TODO: should validate other (e.g., no end-paragraph after syllabic)
        let lyricAttribs = "" +
            numberLevelToXML(lyric) +
            nameToXML(lyric) +
            justifyToXML(lyric) +
            positionToXML(lyric) +
            placementToXML(lyric) +
            colorToXML(lyric) +
            printObjectToXML(lyric);
        let lyricChildren = [];
        (lyric.lyricParts || []).forEach((part) => {
            // relies on part._class as set in musicxml-interfaces
            switch (part._class) {
                case "Syllabic":
                    // <!ELEMENT syllabic (#PCDATA)>
                    lyricChildren.push(dangerous `<syllabic>${syllabicTypeToXML[part.data]}</syllabic>`);
                    break;
                case "Text":
                    // <!ELEMENT text (#PCDATA)>
                    // <!ATTLIST text
                    //     %font;
                    //     %color;
                    //     %text-decoration;
                    //     %text-rotation;
                    //     %letter-spacing;
                    //     xml:lang NMTOKEN #IMPLIED TODO musicxml-interfaces
                    //     %text-direction;
                    let textpcdata = xml `${part.data}`;
                    lyricChildren.push(dangerous `<text${fontToXML(part) +
                        colorToXML(part) +
                        textDecorationToXML(part) +
                        textRotationToXML(part) +
                        letterSpacingToXML(part) +
                        textDirectionToXML(part)}>${textpcdata}</text>`);
                    break;
                case "Elision":
                    // <!ELEMENT elision (#PCDATA)>
                    // <!ATTLIST elision
                    //     %font;
                    //     %color;
                    // >
                    let pcdata = xml `${part.data}`;
                    lyricChildren.push(dangerous `<elision${startStopContinueToXML(part) + printStyleToXML(part)}>${pcdata}</elision>`);
                    break;
                case "Extend":
                    // <!ELEMENT extend EMPTY>
                    // <!ATTLIST extend
                    //     type %start-stop-continue; #IMPLIED
                    //     %print-style;
                    // >
                    lyricChildren.push(dangerous `<extend${startStopContinueToXML(part) + printStyleToXML(part)} />`);
                    break;
                case "Laughing":
                    // <!ELEMENT laughing EMPTY>
                    lyricChildren.push(xml `<laughing />`);
                    break;
                case "Humming":
                    // <!ELEMENT humming EMPTY>
                    lyricChildren.push(xml `<humming />`);
                    break;
                case "EndLine":
                    // <!ELEMENT end-line EMPTY>
                    lyricChildren.push(xml `<end-line />`);
                    break;
                case "EndParagraph":
                    // <!ELEMENT end-paragraph EMPTY>
                    lyricChildren.push(xml `<end-paragraph />`);
                    break;
                case "Footnote":
                case "Level":
                case "Editorial":
                    lyricChildren = lyricChildren.concat(editorialToXML(part));
                    break;
            }
        });
        elements.push(dangerous `<lyric${lyricAttribs}>\n${lyricChildren
            .join("\n")
            .split("\n")
            .map((n) => "  " + n)
            .join("\n")}\n</lyric>`);
    });
    if (defined(note.play)) {
        // <!ELEMENT play ((ipa | mute | semi-pitched | other-play)*)>
        // <!ATTLIST play
        //     id IDREF #IMPLIED
        // >
        let playAttribs = "";
        let playChildren = [];
        // TODO: musicxml-interfaces is missing play.id!!
        // if (defined(note.play.id)) {
        //     playAttribs += xml ` id="${note.play.id}"`;
        // }
        // <!ELEMENT ipa (#PCDATA)>
        if (defined(note.play.ipa)) {
            playChildren.push(xml `<ipa>${note.play.ipa}</ipa>`);
        }
        // <!ELEMENT mute (#PCDATA)>
        if (defined(note.play.mute)) {
            playChildren.push(xml `<mute>${note.play.mute}</mute>`);
        }
        // <!ELEMENT semi-pitched (#PCDATA)>
        if (defined(note.play.semiPitched)) {
            playChildren.push(xml `<semi-pitched>${note.play.semiPitched}</semi-pitched>`);
        }
        // <!ELEMENT other-play (#PCDATA)>
        // <!ATTLIST other-play
        //     type CDATA #REQUIRED
        // >
        if (defined(note.play.otherPlay)) {
            let oPcdata = xml `${note.play.otherPlay.data}`;
            let oAttribs = "";
            if (defined(note.play.otherPlay.type)) {
                oAttribs += xml ` type="${note.play.otherPlay.type}"`;
            }
            playChildren.push(dangerous `<other-play${oAttribs}>${oPcdata}</other-play>`);
        }
        elements.push(dangerous `<play${playAttribs}>\n${playChildren
            .join("\n")
            .split("\n")
            .map((n) => "  " + n)
            .join("\n")}\n</play>`);
    }
    return dangerous `<note${attribs}>\n${elements
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</note>`;
}
function figuredBassToXML(figuredBass) {
    // <!ELEMENT figured-bass (figure+, duration?, %editorial;)>
    // <!ATTLIST figured-bass
    //     %print-style;
    //     %printout;
    //     parentheses %yes-no; #IMPLIED
    // >
    let attribs = "" + printStyleToXML(figuredBass) + printoutToXML(figuredBass);
    if (defined(figuredBass.parentheses)) {
        attribs += yesNo ` parentheses="${figuredBass.parentheses}"`;
    }
    let children = [];
    children = children.concat(staffDebugInfoToXMLComment(figuredBass));
    (figuredBass.figures || []).forEach((figure) => {
        // <!ELEMENT figure (prefix?, figure-number?, suffix?, extend?)>
        let fChildren = [];
        // <!ELEMENT prefix (#PCDATA)>
        // <!ATTLIST prefix
        //     %print-style;
        // >
        if (defined(figure.prefix)) {
            let pcdata = xml `${figure.prefix.data}`;
            fChildren.push(dangerous `<prefix${printStyleToXML(figure.prefix)}>${pcdata}</prefix>`);
        }
        // <!ELEMENT figure-number (#PCDATA)>
        // <!ATTLIST figure-number
        //     %print-style;
        // >
        if (defined(figure.figureNumber)) {
            let pcdata = xml `${figure.figureNumber.data}`;
            fChildren.push(dangerous `<figure-number${printStyleToXML(figure.figureNumber)}>${pcdata}</figure-number>`);
        }
        // <!ELEMENT suffix (#PCDATA)>
        // <!ATTLIST suffix
        //     %print-style;
        // >
        if (defined(figure.suffix)) {
            let pcdata = xml `${figure.suffix.data}`;
            fChildren.push(dangerous `<suffix${printStyleToXML(figure.suffix)}>${pcdata}</suffix>`);
        }
        children.push(dangerous `<figure>\n${fChildren
            .join("\n")
            .split("\n")
            .map((n) => "  " + n)
            .join("\n")}\n</figure>`);
    });
    if (defined(figuredBass.duration)) {
        children.push(xml `<duration>${figuredBass.duration}</duration>`);
    }
    children = children.concat(editorialToXML(figuredBass));
    return dangerous `<figured-bass${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</figured-bass>`;
}
let barlineLocationToXML = {
    1: "right",
    2: "middle",
    0: "left",
};
function barlineToXML(barline) {
    // <!ELEMENT barline (bar-style?, %editorial;, wavy-line?,
    //     segno?, coda?, (fermata, fermata?)?, ending?, repeat?)>
    // <!ATTLIST barline
    //     location (right | left | middle) "right"
    //     segno CDATA #IMPLIED
    //     coda CDATA #IMPLIED
    //     divisions CDATA #IMPLIED
    // >
    let children = [];
    let attribs = "";
    children = children.concat(staffDebugInfoToXMLComment(barline));
    if (defined(barline.barStyle)) {
        children.push(barStyleToXML(barline.barStyle));
    }
    children = children.concat(editorialToXML(barline));
    if (defined(barline.wavyLine)) {
        children.push(wavyLineToXML(barline.wavyLine));
    }
    if (defined(barline.segno)) {
        children.push(segnoToXML(barline.segno));
    }
    if (defined(barline.coda)) {
        children.push(codaToXML(barline.coda));
    }
    (barline.fermatas || []).forEach((fermata) => {
        children.push(fermataToXML(fermata));
    });
    if (defined(barline.ending)) {
        children.push(endingToXML(barline.ending));
    }
    if (defined(barline.repeat)) {
        children.push(repeatToXML(barline.repeat));
    }
    if (defined(barline.location)) {
        attribs += xml ` location="${barlineLocationToXML[barline.location]}"`;
    }
    if (defined(barline.segnoAttrib)) {
        attribs += xml ` segno="${barline.segnoAttrib}"`;
    }
    if (defined(barline.codaAttrib)) {
        attribs += xml ` coda="${barline.codaAttrib}"`;
    }
    if (defined(barline.divisions)) {
        attribs += xml ` divisions="${barline.divisions}"`;
    }
    return dangerous `<barline${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</barline>`;
}
function directionTypeToXML(d) {
    // <!ELEMENT direction-type (rehearsal+ | segno+ | words+ |
    let children = [];
    (d.rehearsals || []).forEach((rehearsal) => {
        children.push(rehearsalToXML(rehearsal));
    });
    (d.segnos || []).forEach((segno) => {
        children.push(segnoToXML(segno));
    });
    (d.words || []).forEach((words) => {
        children.push(wordsToXML(words));
    });
    //     coda+ | wedge | dynamics+ | dashes | bracket | pedal |
    (d.codas || []).forEach((coda) => {
        children.push(codaToXML(coda));
    });
    if (defined(d.wedge)) {
        children.push(wedgeToXML(d.wedge));
    }
    if (defined(d.dynamics)) {
        children.push(dynamicsToXML(d.dynamics));
    }
    if (defined(d.dashes)) {
        children.push(dashesToXML(d.dashes));
    }
    if (defined(d.bracket)) {
        children.push(bracketToXML(d.bracket));
    }
    if (defined(d.pedal)) {
        children.push(pedalToXML(d.pedal));
    }
    //     metronome | octave-shift | harp-pedals | damp | damp-all |
    if (defined(d.metronome)) {
        children.push(metronomeToXML(d.metronome));
    }
    if (defined(d.octaveShift)) {
        children.push(octaveShiftToXML(d.octaveShift));
    }
    if (defined(d.harpPedals)) {
        children.push(harpPedalsToXML(d.harpPedals));
    }
    if (defined(d.damp)) {
        children.push(dampToXML(d.damp));
    }
    if (defined(d.dampAll)) {
        children.push(dampAllToXML(d.dampAll));
    }
    //     eyeglasses | string-mute | scordatura | image |
    if (defined(d.eyeglasses)) {
        children.push(eyeglassesToXML(d.eyeglasses));
    }
    if (defined(d.stringMute)) {
        children.push(stringMuteToXML(d.stringMute));
    }
    if (defined(d.scordatura)) {
        children.push(scordaturaToXML(d.scordatura));
    }
    if (defined(d.image)) {
        children.push(imageToXML(d.image));
    }
    //     principal-voice | accordion-registration | percussion+ |
    if (defined(d.principalVoice)) {
        children.push(principalVoiceToXML(d.principalVoice));
    }
    if (defined(d.accordionRegistration)) {
        children.push(accordionRegistrationToXML(d.accordionRegistration));
    }
    (d.percussions || []).forEach((p) => {
        children.push(percussionToXML(p));
    });
    //     other-direction)>
    if (defined(d.otherDirection)) {
        children.push(otherDirectionToXML(d.otherDirection));
    }
    return dangerous `<direction-type>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</direction-type>`;
}
function offsetToXML(offset) {
    // <!ELEMENT offset (#PCDATA)>
    // <!ATTLIST offset
    //     sound %yes-no; #IMPLIED
    // >
    let pcdata = xml `${offset.data || ""}`;
    let attribs = yesNo ` sound="${offset.sound}"`;
    return dangerous `<offset${attribs}>${pcdata}</offset>`;
}
function rehearsalToXML(rehearsal) {
    // <!ELEMENT rehearsal (#PCDATA)>
    // <!ATTLIST rehearsal
    //     %text-formatting;
    // >
    let pcdata = xml `${rehearsal.data}`;
    return dangerous `<rehearsal${textFormattingToXML(rehearsal)}>${pcdata}</rehearsal>`;
}
function wordsToXML(words) {
    // <!ELEMENT words (#PCDATA)>
    // <!ATTLIST words
    //     %text-formatting;
    // >
    let pcdata = xml `${words.data}`;
    return dangerous `<words${textFormattingToXML(words)}>${pcdata}</words>`;
}
let wedgeTypeToXML = {
    [WedgeType.Diminuendo]: "diminuendo",
    [WedgeType.Crescendo]: "crescendo",
    [WedgeType.Stop]: "stop",
    [WedgeType.Continue]: "continue",
};
function wedgeToXML(wedge) {
    // <!ELEMENT wedge EMPTY>
    // <!ATTLIST wedge
    //     type (crescendo | diminuendo | stop | continue) #REQUIRED
    //     number %number-level; #IMPLIED
    //     spread %tenths; #IMPLIED
    //     niente %yes-no; #IMPLIED
    //     %line-type;
    //     %dashed-formatting;
    //     %position;
    //     %color;
    // >
    let attribs = "" + xml ` type="${wedgeTypeToXML[wedge.type]}"` + numberLevelToXML(wedge);
    if (defined(wedge.spread)) {
        attribs += xml ` spread="${wedge.spread}"`;
    }
    if (defined(wedge.niente)) {
        attribs += yesNo ` niente="${wedge.niente}"`;
    }
    attribs +=
        lineTypeToXML(wedge) +
            dashedFormattingToXML(wedge) +
            positionToXML(wedge) +
            colorToXML(wedge);
    return dangerous `<wedge${attribs} />`;
}
function dynamicsToXML(dynamics) {
    // <!ELEMENT dynamics ((p | pp | ppp | pppp | ppppp | pppppp |
    //     f | ff | fff | ffff | fffff | ffffff | mp | mf | sf |
    //     sfp | sfpp | fp | rf | rfz | sfz | sffz | fz |
    //     other-dynamics)*)>
    // <!ATTLIST dynamics
    //     %print-style-align;
    //     %placement;
    //     %text-decoration;
    //     %enclosure;
    // >
    // <!ELEMENT p EMPTY>
    // ...
    // <!ELEMENT other-dynamics (#PCDATA)>
    let oChildren = [];
    Object.keys(dynamics || {}).forEach((key) => {
        let subDynamic = dynamics[key];
        if (!!subDynamic &&
            [
                "p",
                "pp",
                "ppp",
                "pppp",
                "ppppp",
                "pppppp",
                "f",
                "ff",
                "fff",
                "ffff",
                "fffff",
                "ffffff",
                "mp",
                "mf",
                "sf",
                "sfp",
                "sfpp",
                "fp",
                "rf",
                "rfz",
                "sfz",
                "sffz",
                "fz",
            ].indexOf(key) !== -1) {
            oChildren.push(dangerous `<${key} />`);
        }
    });
    if (dynamics.otherDynamics) {
        oChildren.push(xml `<other-dynamics>${dynamics.otherDynamics}</other-dynamics>`);
    }
    return dangerous `<dynamics${printStyleAlignToXML(dynamics) +
        placementToXML(dynamics) +
        textDecorationToXML(dynamics) +
        enclosureToXML(dynamics)}>\n${oChildren
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</dynamics>`;
}
function dashesToXML(dashes) {
    // <!ELEMENT dashes EMPTY>
    // <!ATTLIST dashes
    //     type %start-stop-continue; #REQUIRED
    //     number %number-level; #IMPLIED
    //     %dashed-formatting;
    //     %position;
    //     %color;
    // >
    let attribs = "" +
        startStopContinueToXML(dashes) +
        numberLevelToXML(dashes) +
        dashedFormattingToXML(dashes) +
        positionToXML(dashes) +
        colorToXML(dashes);
    return dangerous `<dashes${attribs} />`;
}
let lineEndTypeToXML = {
    [LineEndType.None]: "none",
    [LineEndType.Both]: "both",
    [LineEndType.Arrow]: "arrow",
    [LineEndType.Down]: "down",
    [LineEndType.Up]: "up",
};
function bracketToXML(bracket) {
    // <!ELEMENT bracket EMPTY>
    // <!ATTLIST bracket
    //     type %start-stop-continue; #REQUIRED
    //     number %number-level; #IMPLIED
    //     line-end (up | down | both | arrow | none) #REQUIRED
    //     end-length %tenths; #IMPLIED
    //     %line-type;
    //     %dashed-formatting;
    //     %position;
    //     %color;
    // >
    let attribs = "" + startStopContinueToXML(bracket) + numberLevelToXML(bracket);
    attribs += xml ` line-end="${lineEndTypeToXML[bracket.lineEnd]}"`;
    if (defined(bracket.endLength)) {
        attribs += xml ` end-length="${bracket.endLength}"`;
    }
    attribs +=
        lineTypeToXML(bracket) +
            dashedFormattingToXML(bracket) +
            positionToXML(bracket) +
            colorToXML(bracket);
    return dangerous `<bracket${attribs} />`;
}
let pedalTypeToXML = {
    [PedalType.Change]: "change",
    [PedalType.Start]: "start",
    [PedalType.Stop]: "stop",
    [PedalType.Continue]: "continue",
};
function pedalToXML(pedal) {
    // <!ELEMENT pedal EMPTY>
    // <!ATTLIST pedal
    //     type (start | stop | continue | change) #REQUIRED
    //     line %yes-no; #IMPLIED
    //     sign %yes-no; #IMPLIED
    //     %print-style-align;
    // >
    let attribs = "" + xml ` type="${pedalTypeToXML[pedal.type]}"`;
    if (defined(pedal.line)) {
        attribs += yesNo ` line="${pedal.line}"`;
    }
    if (defined(pedal.sign)) {
        attribs += yesNo ` sign="${pedal.sign}"`;
    }
    attribs += printStyleAlignToXML(pedal);
    return dangerous `<pedal${attribs} />`;
}
function metronomeToXML(metronome) {
    // <!ELEMENT metronome
    //     ((beat-unit, beat-unit-dot*,
    //      (per-minute | (beat-unit, beat-unit-dot*))) |
    //     (metronome-note+, (metronome-relation, metronome-note+)?))>
    // <!ATTLIST metronome
    //     %print-style-align;
    //     %justify;
    //     parentheses %yes-no; #IMPLIED
    // >
    let children = [];
    let attribs = "" + printStyleAlignToXML(metronome) + justifyToXML(metronome);
    if (defined(metronome.parentheses)) {
        attribs += yesNo ` parentheses="${metronome.parentheses}"`;
    }
    if (defined(metronome.beatUnit)) {
        // <!ELEMENT beat-unit (#PCDATA)>
        children.push(xml `<beat-unit>${metronome.beatUnit}</beat-unit>`);
    }
    (metronome.beatUnitDots || []).forEach(() => {
        // <!ELEMENT beat-unit-dot EMPTY>
        children.push(xml `<beat-unit-dot />`);
    });
    if (defined(metronome.perMinute)) {
        // <!ELEMENT per-minute (#PCDATA)>
        // <!ATTLIST per-minute
        //     %font;
        // >
        let pcdata = xml `${metronome.perMinute.data}`;
        children.push(dangerous `<per-minute${fontToXML(metronome.perMinute)}>${pcdata}</per-minute>`);
    }
    else {
        if (defined(metronome.beatUnitChange)) {
            // <!ELEMENT beat-unit (#PCDATA)>
            children.push(xml `<beat-unit>${metronome.beatUnitChange}</beat-unit>`);
        }
        (metronome.beatUnitDotsChange || []).forEach(() => {
            // <!ELEMENT beat-unit-dot EMPTY>
            children.push(xml `<beat-unit-dot />`);
        });
    }
    // TODO musicxml-interfaces second beat-unit!!
    (metronome.metronomeNotes || []).forEach((note) => {
        // <!ELEMENT metronome-note
        //     (metronome-type, metronome-dot*,
        //      metronome-beam*, metronome-tuplet?)>
        let oChildren = [];
        if (defined(note.metronomeType)) {
            // <!ELEMENT metronome-type (#PCDATA)>
            oChildren.push(xml `<metronome-type>${note.metronomeType}</metronome-type>`);
        }
        (note.metronomeDots || []).forEach(() => {
            // <!ELEMENT metronome-dot EMPTY>
            oChildren.push(xml `<metronome-dot />`);
        });
        (note.metronomeBeams || []).forEach((beam) => {
            // <!ELEMENT metronome-beam (#PCDATA)>
            // <!ATTLIST metronome-beam
            //     number %beam-level; "1"
            // >
            let pcdata = xml `${beam.data}`;
            oChildren.push(dangerous `<metronome-beam${numberLevelToXML(beam)}>${pcdata}</metronome-beam>`);
        });
        if (defined(note.metronomeTuplet)) {
            oChildren.push(metronomeTupletToXML(note.metronomeTuplet));
        }
        children.push(dangerous `<metronome-note>\n${oChildren
            .join("\n")
            .split("\n")
            .map((n) => "  " + n)
            .join("\n")}\n</metronome-note>`);
    });
    if (defined(metronome.metronomeRelation)) {
        // <!ELEMENT metronome-relation (#PCDATA)>
        children.push(xml `<metronome-relation>${metronome.metronomeRelation}</metronome-relation>`);
    }
    return dangerous `<metronome${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</metronome>`;
}
function metronomeTupletToXML(metronomeTuplet) {
    // <!ELEMENT metronome-tuplet
    //     (actual-notes, normal-notes,
    //      (normal-type, normal-dot*)?)>
    // <!ATTLIST metronome-tuplet
    //     type %start-stop; #REQUIRED
    //     bracket %yes-no; #IMPLIED
    //     show-number (actual | both | none) #IMPLIED
    // >
    let children = [];
    let attribs = "" + startStopToXML(metronomeTuplet);
    if (defined(metronomeTuplet.bracket)) {
        attribs += yesNo ` bracket="${metronomeTuplet.bracket}"`;
    }
    if (defined(metronomeTuplet.showNumber)) {
        attribs += xml ` show-number="${actualBothNoneToXML[metronomeTuplet.showNumber]}"`;
    }
    if (metronomeTuplet.actualNotes) {
        children.push(xml `<actual-notes>${metronomeTuplet.actualNotes}</actual-notes>`);
    }
    if (metronomeTuplet.normalNotes) {
        children.push(xml `<normal-notes>${metronomeTuplet.normalNotes}</normal-notes>`);
    }
    if (metronomeTuplet.normalType) {
        children.push(xml `<normal-type>${metronomeTuplet.normalType}</normal-type>`);
    }
    (metronomeTuplet.normalDots || []).forEach(() => {
        children.push(xml `<normal-dot />`);
    });
    return dangerous `<metronome-tuplet${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</metronome-tuplet>`;
}
let octaveShiftTypeToXML = {
    [OctaveShiftType.Down]: "down",
    [OctaveShiftType.Stop]: "stop",
    [OctaveShiftType.Up]: "up",
    [OctaveShiftType.Continue]: "continue",
};
function octaveShiftToXML(octaveShift) {
    // <!ELEMENT octave-shift EMPTY>
    // <!ATTLIST octave-shift
    //     type (up | down | stop | continue) #REQUIRED
    //     number %number-level; #IMPLIED
    //     size CDATA "8"
    //     %dashed-formatting;
    //     %print-style;
    // >
    let attribs = "" +
        xml ` type="${octaveShiftTypeToXML[octaveShift.type]}"` +
        numberLevelToXML(octaveShift);
    if (defined(octaveShift.size)) {
        attribs += xml ` size="${octaveShift.size}"`;
    }
    attribs += dashedFormattingToXML(octaveShift) + printStyleToXML(octaveShift);
    return dangerous `<octave-shift${attribs} />`;
}
function harpPedalsToXML(harpPedals) {
    // <!ELEMENT harp-pedals (pedal-tuning)+>
    // <!ATTLIST harp-pedals
    //     %print-style-align;
    // >
    // <!ELEMENT pedal-tuning (pedal-step, pedal-alter)>
    // <!ELEMENT pedal-step (#PCDATA)>
    // <!ELEMENT pedal-alter (#PCDATA)>
    let children = [];
    (harpPedals.pedalTunings || []).forEach((tuning) => {
        let nChildren = [];
        if (tuning.pedalStep) {
            nChildren.push(xml `<pedal-step>${tuning.pedalStep}</pedal-step>`);
        }
        if (tuning.pedalAlter) {
            nChildren.push(xml `<pedal-alter>${tuning.pedalAlter}</pedal-alter>`);
        }
        children.push(dangerous `<pedal-tuning>\n${nChildren
            .join("\n")
            .split("\n")
            .map((n) => "  " + n)
            .join("\n")}\n</pedal-tuning>`);
    });
    let attribs = printStyleAlignToXML(harpPedals);
    return dangerous `<harp-pedals${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</harp-pedals>`;
}
function dampToXML(damp) {
    // <!ELEMENT damp EMPTY>
    // <!ATTLIST damp
    //     %print-style-align;
    // >
    return dangerous `<damp${printStyleAlignToXML(damp)} />`;
}
function dampAllToXML(dampAll) {
    // <!ELEMENT damp-all EMPTY>
    // <!ATTLIST damp-all
    //     %print-style-align;
    // >
    return dangerous `<damp-all${printStyleAlignToXML(dampAll)} />`;
}
function eyeglassesToXML(eyeglasses) {
    // <!ELEMENT eyeglasses EMPTY>
    // <!ATTLIST eyeglasses
    //     %print-style-align;
    // >
    return dangerous `<eyeglasses${printStyleAlignToXML(eyeglasses)} />`;
}
function stringMuteToXML(stringMute) {
    // <!ELEMENT string-mute EMPTY>
    // <!ATTLIST string-mute
    //     type (on | off) #REQUIRED
    //     %print-style-align;
    // >
    let attribs = xml ` type="${stringMute.type}"` + printStyleAlignToXML(stringMute);
    return dangerous `<string-mute${attribs} />`;
}
function scordaturaToXML(scordatura) {
    // <!ELEMENT scordatura (accord+)>
    // <!ELEMENT accord
    //     (tuning-step, tuning-alter?, tuning-octave)>
    // <!ATTLIST accord
    //     string CDATA #REQUIRED
    // >
    let children = [];
    (scordatura.accords || []).forEach((accord) => {
        let oChildren = tuningStepAlterOctaveToXML(accord);
        let oAttribs = xml ` string="${accord.string}"`;
        children.push(dangerous `<accord${oAttribs}>\n${oChildren
            .join("\n")
            .split("\n")
            .map((n) => "  " + n)
            .join("\n")}\n</accord>`);
    });
    return dangerous `<scordatura>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</scordatura>`;
}
function imageToXML(image) {
    // <!ELEMENT image EMPTY>
    // <!ATTLIST image
    //     source CDATA #REQUIRED
    //     type CDATA #REQUIRED
    //     %position;
    //     %halign;
    //     %valign-image;
    // >
    let attribs = "" +
        xml ` source="${image.source}"` +
        xml ` type="${image.type}"` +
        positionToXML(image) +
        halignToXML(image) +
        valignImageToXML(image);
    return dangerous `<image${attribs} />`;
}
let voiceSymbolToXML = {
    [VoiceSymbol.None]: "none",
    [VoiceSymbol.Hauptstimme]: "hauptstimme",
    [VoiceSymbol.Nebenstimme]: "nebenstimme",
    [VoiceSymbol.Plain]: "plain",
};
function principalVoiceToXML(principalVoice) {
    // <!ELEMENT principal-voice (#PCDATA)>
    // <!ATTLIST principal-voice
    //     type %start-stop; #REQUIRED
    //     symbol (Hauptstimme | Nebenstimme | plain | none) #REQUIRED
    //     %print-style-align;
    // >
    let pcdata = xml `${principalVoice.data}`;
    let attribs = startStopToXML(principalVoice) +
        xml ` symbol="${voiceSymbolToXML[principalVoice.symbol]}"` +
        printStyleAlignToXML(principalVoice);
    return dangerous `<principal-voice${attribs}${pcdata}</principal-voice>`;
}
function accordionRegistrationToXML(accordionRegistration) {
    // <!ELEMENT accordion-registration
    //     (accordion-high?, accordion-middle?, accordion-low?)>
    // <!ATTLIST accordion-registration
    //     %print-style-align;
    // >
    // <!ELEMENT accordion-high EMPTY>
    // <!ELEMENT accordion-middle (#PCDATA)>
    // <!ELEMENT accordion-low EMPTY>
    let children = [];
    let attribs = printStyleAlignToXML(accordionRegistration);
    if (defined(accordionRegistration.accordionHigh)) {
        children.push(xml `<accordion-high />`);
    }
    if (defined(accordionRegistration.accordionMiddle)) {
        children.push(xml `<accordion-middle>${accordionRegistration.accordionMiddle || ""}</accordion-middle>`);
    }
    if (defined(accordionRegistration.accordionLow)) {
        children.push(xml `<accordion-low />`);
    }
    return dangerous `<accordion-registration${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</accordion-registration>`;
}
let tipDirectionToXML = {
    [TipDirection.Right]: "right",
    [TipDirection.Northwest]: "northwest",
    [TipDirection.Southwest]: "southwest",
    [TipDirection.Down]: "down",
    [TipDirection.Northeast]: "northeast",
    [TipDirection.Southeast]: "southeast",
    [TipDirection.Up]: "up",
    [TipDirection.Left]: "left",
};
function percussionToXML(percussion) {
    // <!ELEMENT percussion
    //     (glass | metal | wood | pitched | membrane | effect |
    //      timpani | beater | stick | stick-location |
    //      other-percussion)>
    // <!ATTLIST percussion
    //     %print-style-align;
    //     %enclosure;
    // >
    let children = [];
    if (defined(percussion.glass)) {
        // <!ELEMENT glass (#PCDATA)>
        children.push(xml `<glass>${percussion.glass}</glass>`);
    }
    if (defined(percussion.metal)) {
        // <!ELEMENT metal (#PCDATA)>
        children.push(xml `<metal>${percussion.metal}</metal>`);
    }
    if (defined(percussion.wood)) {
        // <!ELEMENT wood (#PCDATA)>
        children.push(xml `<wood>${percussion.wood}</wood>`);
    }
    if (defined(percussion.pitched)) {
        // <!ELEMENT pitched (#PCDATA)>
        children.push(xml `<pitched>${percussion.pitched}</pitched>`);
    }
    if (defined(percussion.membrane)) {
        // <!ELEMENT membrane (#PCDATA)>
        children.push(xml `<membrane>${percussion.membrane}</membrane>`);
    }
    if (defined(percussion.effect)) {
        // <!ELEMENT effect (#PCDATA)>
        children.push(xml `<effect>${percussion.effect}</effect>`);
    }
    if (defined(percussion.timpani)) {
        // <!ELEMENT timpani EMPTY>
        children.push(xml `<timpani />`);
    }
    if (defined(percussion.beater)) {
        // <!ELEMENT beater (#PCDATA)>
        // <!ATTLIST beater
        //     tip %tip-direction; #IMPLIED
        // >
        let pcdata = xml `${percussion.beater.data || ""}`;
        let oAttribs = "";
        if (defined(percussion.beater.tip)) {
            oAttribs += xml ` tip="${tipDirectionToXML[percussion.beater.tip]}"`;
        }
        children.push(dangerous `<beater${oAttribs}>${pcdata}</beater>`);
    }
    if (defined(percussion.stick)) {
        // <!ELEMENT stick (stick-type, stick-material)>
        // <!ATTLIST stick
        //     tip %tip-direction; #IMPLIED
        //     >
        // <!ELEMENT stick-type (#PCDATA)>
        // <!ELEMENT stick-material (#PCDATA)>
        let pcdata = "";
        let oAttribs = "";
        if (defined(percussion.stick.tip)) {
            oAttribs += xml ` tip="${tipDirectionToXML[percussion.stick.tip]}"`;
        }
        if (defined(percussion.stick.stickType)) {
            pcdata += xml `  <stick-type>${percussion.stick.stickType}</stick-type>\n`;
        }
        if (defined(percussion.stick.stickMaterial)) {
            pcdata += xml `  <stick-material>${percussion.stick.stickMaterial}</stick-material>\n`;
        }
        children.push(dangerous `<stick${oAttribs}>${pcdata}</stick>`);
    }
    if (defined(percussion.stickLocation)) {
        // <!ELEMENT stick-location (#PCDATA)>
        children.push(xml `<stick-location>${percussion.stickLocation}</stick-location>`);
    }
    if (defined(percussion.otherPercussion)) {
        // <!ELEMENT other-percussion (#PCDATA)>
        children.push(xml `<other-percussion>${percussion.otherPercussion}</other-percussion>`);
    }
    return dangerous `<percussion>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</percussion>`;
}
function otherDirectionToXML(otherDirection) {
    // <!ELEMENT other-direction (#PCDATA)>
    // <!ATTLIST other-direction
    //     %print-object;
    //     %print-style-align;
    // >
    let pcdata = xml `${otherDirection.data}`;
    return dangerous `<other-direction${printObjectToXML(otherDirection) + printStyleAlignToXML(otherDirection)}>${pcdata}</other-direction>`;
}
function wavyLineToXML(wavyLine) {
    // <!ELEMENT wavy-line EMPTY>
    // <!ATTLIST wavy-line
    //     type %start-stop-continue; #REQUIRED
    //     number %number-level; #IMPLIED
    //     %position;
    //     %placement;
    //     %color;
    //     %trill-sound;
    // >
    let attribs = "" +
        startStopContinueToXML(wavyLine) +
        numberLevelToXML(wavyLine) +
        positionToXML(wavyLine) +
        placementToXML(wavyLine) +
        colorToXML(wavyLine) +
        trillSoundToXML(wavyLine);
    return dangerous `<wavy-line${attribs} />`;
}
let barStyleTypeToXML = {
    0: "regular",
    5: "light-heavy",
    6: "heavy-light",
    9: "short",
    10: "none",
    2: "dashed",
    7: "heavy-heavy",
    8: "tick",
    1: "dotted",
    3: "heavy",
    4: "light-light",
};
function barStyleToXML(barStyle) {
    // <!ELEMENT bar-style (#PCDATA)>
    // <!ATTLIST bar-style
    //     %color;
    // >
    let attribs = "" + colorToXML(barStyle);
    let pcdata = xml `${barStyleTypeToXML[barStyle.data] || ""}`;
    return dangerous `<bar-style${attribs}>${pcdata}</bar-style>`;
}
let startStopDiscontinueTypeToXML = {
    [StartStopDiscontinue.Start]: "start",
    [StartStopDiscontinue.Stop]: "stop",
    [StartStopDiscontinue.Discontinue]: "discontinue",
};
function endingToXML(ending) {
    // <!ELEMENT ending (#PCDATA)>
    // <!ATTLIST ending
    //     number CDATA #REQUIRED
    //     type (start | stop | discontinue) #REQUIRED
    //     %print-object;
    //     %print-style;
    //     end-length %tenths; #IMPLIED
    //     text-x %tenths; #IMPLIED
    //     text-y %tenths; #IMPLIED
    // >
    let attribs = "" +
        numberLevelToXML(ending) +
        startStopDiscontinueToXML(ending) +
        printObjectToXML(ending) +
        printStyleToXML(ending);
    if (defined(ending.endLength)) {
        attribs += xml ` end-length="${ending.endLength}"`;
    }
    if (defined(ending.textX)) {
        attribs += xml ` text-x="${ending.textX}"`;
    }
    if (defined(ending.textY)) {
        attribs += xml ` text-y="${ending.textY}"`;
    }
    let pcdata = xml `${ending.ending}`;
    return dangerous `<ending${attribs}>${pcdata}</ending>`;
}
let directionTypeBgToXML = {
    [DirectionTypeBg.Forward]: "forward",
    [DirectionTypeBg.Backward]: "backward",
};
let wingedTypeToXML = {
    [WingedType.None]: "none",
    [WingedType.Curved]: "curved",
    [WingedType.DoubleCurved]: "double-curved",
    [WingedType.Straight]: "straight",
    [WingedType.DoubleStraight]: "double-straight",
};
function repeatToXML(repeat) {
    // <!ELEMENT repeat EMPTY>
    // <!ATTLIST repeat
    //     direction (backward | forward) #REQUIRED
    //     times CDATA #IMPLIED
    //     winged (none | straight | curved |
    //         double-straight | double-curved) #IMPLIED
    // >
    let attribs = "" + xml ` direction="${directionTypeBgToXML[repeat.direction]}"`;
    if (defined(repeat.times)) {
        attribs += xml ` times="${repeat.times}"`;
    }
    if (defined(repeat.winged)) {
        attribs += xml ` winged="${wingedTypeToXML[repeat.winged]}"`;
    }
    return dangerous `<repeat${attribs} />`;
}
function segnoToXML(segno) {
    // <!ELEMENT segno EMPTY>
    // <!ATTLIST segno
    //     %print-style-align;
    // >
    let attribs = "" + printStyleAlignToXML(segno);
    return dangerous `<segno${attribs} />`;
}
function codaToXML(coda) {
    // <!ELEMENT coda EMPTY>
    // <!ATTLIST coda
    //     %print-style-align;
    // >
    let attribs = "" + printStyleAlignToXML(coda);
    return dangerous `<coda${attribs} />`;
}
let uprightInvertedToXML = {
    0: "upright",
    1: "inverted",
};
let normalAngledSquareToXML = {
    1: "angled",
    2: "square",
    0: "normal",
};
function fermataToXML(fermata) {
    // <!ELEMENT fermata  (#PCDATA)>
    // <!ATTLIST fermata
    //     type (upright | inverted) #IMPLIED
    //     %print-style;
    // >
    let pcdata = defined(fermata.shape)
        ? normalAngledSquareToXML[fermata.shape]
        : "";
    let attribs = defined(fermata.type)
        ? xml ` type="${uprightInvertedToXML[fermata.type]}"`
        : "";
    attribs += printStyleToXML(fermata);
    return dangerous `<fermata${attribs}>${pcdata}</fermata>`;
}
function playToXML(play) {
    // <!ELEMENT play ((ipa | mute | semi-pitched | other-play)*)>
    // <!ATTLIST play
    //     id IDREF #IMPLIED
    // >
    // TODO musicxml-interfaces: missing id
    let children = [];
    if (defined(play.ipa)) {
        children.push(xml `<ipa>${play.ipa}</ipa>`);
    }
    if (defined(play.mute)) {
        children.push(xml `<mute>${play.mute}</mute>`);
    }
    if (defined(play.semiPitched)) {
        children.push(xml `<semi-pitched>${play.semiPitched}</semi-pitched>`);
    }
    if (defined(play.otherPlay)) {
        let pcdata = xml `${play.otherPlay.data}`;
        let oAttribs = "";
        if (defined(play.otherPlay.type)) {
            oAttribs += xml ` type="${play.otherPlay.type}"`;
        }
        children.push(dangerous `<other-play${oAttribs}>${pcdata}</other-play>`);
    }
    return dangerous `<play>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</play>`;
}
function staffLayoutToXML(staffLayout) {
    // <!ELEMENT staff-layout (staff-distance?)>
    // <!ELEMENT staff-distance %layout-tenths;>
    // <!ATTLIST staff-layout
    //     number CDATA #IMPLIED
    // >
    let children = [];
    if (defined(staffLayout.staffDistance)) {
        children.push(xml `<staff-distance>${staffLayout.staffDistance}</staff-distance>`);
    }
    let attribs = numberLevelToXML(staffLayout);
    return dangerous `<staff-layout${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</staff-layout>`;
}
function measureLayoutToXML(measureLayout) {
    // <!ELEMENT measure-layout (measure-distance?)>
    // <!ELEMENT measure-distance %layout-tenths;>
    let children = [];
    if (defined(measureLayout.measureDistance)) {
        children.push(xml `<measure-distance>${measureLayout.measureDistance}</measure-distance>`);
    }
    return dangerous `<measure-layout>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</measure-layout>`;
}
function measureNumberingToXML(measureNumbering) {
    // <!ELEMENT measure-numbering (#PCDATA)>
    // <!ATTLIST measure-numbering
    //     %print-style-align;
    // >
    let attribs = printStyleAlignToXML(measureNumbering);
    let pcdata = xml `${measureNumbering.data}`;
    return dangerous `<measure-numbering${attribs}>${pcdata}</measure-numbering>`;
}
function keyToXML(key) {
    // <!ELEMENT key (((cancel?, fifths, mode?) |
    //     ((key-step, key-alter, key-accidental?)*)), key-octave*)>
    // <!ATTLIST key
    //     number CDATA #IMPLIED
    //     %print-style;
    //     %print-object;
    // >
    let children = [];
    let attribs = "" + numberLevelToXML(key) + printStyleToXML(key) + printObjectToXML(key);
    if (defined(key.cancel)) {
        children.push(cancelToXML(key.cancel));
    }
    if (defined(key.fifths)) {
        // <!ELEMENT fifths (#PCDATA)>
        children.push(xml `<fifths>${key.fifths}</fifths>`);
    }
    if (defined(key.mode)) {
        // <!ELEMENT mode (#PCDATA)>
        children.push(xml `<mode>${key.mode}</mode>`);
    }
    (key.keySteps || []).forEach((keyStep, idx) => {
        // <!ELEMENT key-step (#PCDATA)>
        // <!ELEMENT key-alter (#PCDATA)>
        // <!ELEMENT key-accidental (#PCDATA)>
        children.push(xml `<key-step>${keyStep}</key-step>`);
        children.push(xml `<key-alter>${key.keyAlters[idx]}</key-alter>`);
        if (key.keyAccidentals && key.keyAccidentals[idx]) {
            children.push(xml `<key-accidental>${key.keyAccidentals[idx]}</key-accidental>`);
        }
    });
    (key.keyOctaves || []).forEach((keyOctave) => {
        children.push(keyOctaveToXML(keyOctave));
    });
    return dangerous `<key${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</key>`;
}
let cancelLocationToXML = {
    1: "right",
    2: "before-barline",
    0: "left",
};
function cancelToXML(cancel) {
    // <!ELEMENT cancel (#PCDATA)>
    // <!ATTLIST cancel
    //     location (left | right | before-barline) #IMPLIED
    // >
    let attribs = "";
    let pcdata = xml `${cancel.fifths}`;
    if (defined(cancel.location)) {
        attribs += xml ` location="${cancelLocationToXML[cancel.location]}"`;
    }
    return dangerous `<cancel${attribs}>${pcdata}</cancel>`;
}
function keyOctaveToXML(keyOctave) {
    // <!ELEMENT key-octave (#PCDATA)>
    // <!ATTLIST key-octave
    //     number NMTOKEN #REQUIRED
    //     cancel %yes-no; #IMPLIED
    // >
    let attribs = numberLevelToXML(keyOctave);
    let pcdata = xml `${keyOctave.octave}`;
    if (defined(keyOctave.cancel)) {
        attribs += yesNo ` cancel="${keyOctave.cancel}"`;
    }
    return dangerous `<key-octave${attribs}>${pcdata}</key-octave>`;
}
function timeToXML(time) {
    // <!ELEMENT time
    //     (((beats, beat-type)+, interchangeable?) | senza-misura)>
    // <!ATTLIST time
    //     number CDATA #IMPLIED
    //     %time-symbol;
    //     %time-separator;
    //     %print-style-align;
    //     %print-object;
    // >
    let attribs = "" +
        numberLevelToXML(time) +
        timeSymbolToXML(time) +
        timeSeparatorToXML(time) +
        printStyleAlignToXML(time) +
        printObjectToXML(time);
    let children = [];
    if (time.senzaMisura != null) {
        // <!ELEMENT senza-misura (#PCDATA)>
        // TODO musicxml-interfaces: PCDATA?
        children.push(xml `<senza-misura />`);
    }
    else {
        // TODO musicxml-interfaces: check this
        (time.beats || []).forEach((beats, idx) => {
            // <!ELEMENT beats (#PCDATA)>
            // <!ELEMENT beat-type (#PCDATA)>
            children.push(xml `<beats>${beats}</beats>`);
            children.push(xml `<beat-type>${time.beatTypes[idx]}</beat-type>`);
        });
        if (defined(time.interchangeable)) {
            children.push(interchangeableToXML(time.interchangeable));
        }
    }
    return dangerous `<time${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</time>`;
}
let timeSymbolTypeToXML = {
    4: "dotted-note",
    1: "cut",
    2: "single-number",
    3: "note",
    0: "common",
    5: "normal",
};
function timeSymbolToXML(timeSymbol) {
    // <!ENTITY % time-symbol
    //     "symbol (common | cut | single-number |
    //              note | dotted-note | normal) #IMPLIED">
    if (defined(timeSymbol.symbol)) {
        return xml ` symbol="${timeSymbolTypeToXML[timeSymbol.symbol]}"`;
    }
    return "";
}
let separatorTypeToXML = {
    0: "none",
    1: "horizontal",
    2: "diagonal",
    3: "vertical",
    4: "adjacent",
};
function timeSeparatorToXML(timeSeparator) {
    // <!ENTITY % time-separator
    //     "separator (none | horizontal | diagonal |
    //         vertical | adjacent) #IMPLIED">
    if (defined(timeSeparator.separator)) {
        return xml ` separator="${separatorTypeToXML[timeSeparator.separator]}"`;
    }
    return "";
}
function interchangeableToXML(interchangeable) {
    // <!ELEMENT interchangeable (time-relation?, (beats, beat-type)+)>
    // <!ATTLIST interchangeable
    //     %time-symbol;
    //     %time-separator;
    // >
    let attribs = "" + timeSymbolToXML(interchangeable) + timeSeparatorToXML(interchangeable);
    let children = [];
    (interchangeable.beats || []).forEach((beats, idx) => {
        // <!ELEMENT beats (#PCDATA)>
        // <!ELEMENT beat-type (#PCDATA)>
        children.push(xml `<beats>${beats}</beats>`);
        children.push(xml `<beat-type>${interchangeable.beatTypes[idx]}</beat-type>`);
    });
    if (defined(interchangeable.timeRelation)) {
        // <!ELEMENT time-relation (#PCDATA)>
        children.push(xml `<time-relation>${interchangeable.timeRelation}</time-relation>`);
    }
    return dangerous `<interchangeable${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</interchangeable>`;
}
let partSymbolTypeToXML = {
    0: "none",
    2: "line",
    3: "bracket",
    4: "square",
    1: "brace",
};
function partSymbolToXML(partSymbol) {
    // <!ELEMENT part-symbol (#PCDATA)>
    // <!ATTLIST part-symbol
    //     top-staff CDATA #IMPLIED
    //     bottom-staff CDATA #IMPLIED
    //     %position;
    //     %color;
    // >
    let pcdata = "";
    if (defined(partSymbol.type)) {
        pcdata = xml `${partSymbolTypeToXML[partSymbol.type]}`;
    }
    let attribs = "";
    if (defined(partSymbol.topStaff)) {
        attribs += xml ` top-staff="${partSymbol.topStaff}"`;
    }
    if (defined(partSymbol.bottomStaff)) {
        attribs += xml ` bottom-staff="${partSymbol.bottomStaff}"`;
    }
    attribs += positionToXML(partSymbol) + colorToXML(partSymbol);
    return dangerous `<part-symbol${attribs}>${pcdata}</part-symbol>`;
}
let symbolSizeToXML = {
    1: "full",
    2: "cue",
    3: "large",
};
function clefToXML(clef) {
    // <!ELEMENT clef (sign, line?, clef-octave-change?)>
    // <!ATTLIST clef
    //     number CDATA #IMPLIED
    //     additional %yes-no; #IMPLIED
    //     size %symbol-size; #IMPLIED
    //     after-barline %yes-no; #IMPLIED
    //     %print-style;
    //     %print-object;
    // >
    let attribs = "" + numberLevelToXML(clef);
    let children = [];
    if (defined(clef.additional)) {
        attribs += yesNo ` additional="${clef.additional}"`;
    }
    if (clef.size >= SymbolSize.Unspecified) {
        attribs += xml ` size="${symbolSizeToXML[clef.size]}"`;
    }
    if (defined(clef.afterBarline)) {
        attribs += yesNo ` after-barline="${clef.afterBarline}"`;
    }
    attribs += printStyleToXML(clef) + printObjectToXML(clef);
    if (defined(clef.sign)) {
        // <!ELEMENT sign (#PCDATA)>
        children.push(xml `<sign>${clef.sign}</sign>`);
    }
    if (defined(clef.line)) {
        // <!ELEMENT line (#PCDATA)>
        children.push(xml `<line>${clef.line}</line>`);
    }
    if (defined(clef.clefOctaveChange)) {
        // <!ELEMENT clef-octave-change (#PCDATA)>
        children.push(xml `<clef-octave-change>${clef.clefOctaveChange}</clef-octave-change>`);
    }
    return dangerous `<clef${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</clef>`;
}
function staffDetailsToXML(staffDetails) {
    // <!ELEMENT staff-details (staff-type?, staff-lines?,
    //     staff-tuning*, capo?, staff-size?)>
    // <!ATTLIST staff-details
    //     number         CDATA                #IMPLIED
    //     show-frets     (numbers | letters)  #IMPLIED
    //     %print-object;
    //     %print-spacing;
    // >
    let attribs = "";
    let children = [];
    attribs += numberLevelToXML(staffDetails);
    // TODO: musicxml-interfaces show__FRETS__
    attribs += printObjectToXML(staffDetails);
    attribs += printSpacingToXML(staffDetails);
    if (defined(staffDetails.staffType)) {
        // <!ELEMENT staff-type (#PCDATA)>
        children.push(xml `<staff-type>${staffDetails.staffType}</staff-type>`);
    }
    if (defined(staffDetails.staffLines)) {
        // <!ELEMENT staff-lines (#PCDATA)>
        children.push(xml `<staff-lines>${staffDetails.staffLines}</staff-lines>`);
    }
    (staffDetails.staffTunings || []).forEach((tuning) => {
        children.push(staffTuningToXML(tuning));
    });
    if (defined(staffDetails.capo)) {
        // <!ELEMENT capo (#PCDATA)>
        children.push(xml `<capo>${staffDetails.capo}</capo>`);
    }
    if (defined(staffDetails.staffSize)) {
        // <!ELEMENT staff-size (#PCDATA)>
        children.push(xml `<staff-size>${staffDetails.staffSize}</staff-size>`);
    }
    return dangerous `<staff-details${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</staff-details>`;
}
function staffTuningToXML(staffTuning) {
    // <!ELEMENT staff-tuning
    //     (tuning-step, tuning-alter?, tuning-octave)>
    // <!ATTLIST staff-tuning
    //     line CDATA #REQUIRED
    let children = [];
    let attribs = "";
    if (defined(staffTuning.line)) {
        attribs += xml ` line="${staffTuning.line}"`;
    }
    children = children.concat(tuningStepAlterOctaveToXML(staffTuning));
    return dangerous `<staff-tuning${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</staff-tuning>`;
}
function tuningStepAlterOctaveToXML(tuning) {
    let children = [];
    if (defined(tuning.tuningStep)) {
        // <!ELEMENT tuning-step (#PCDATA)>
        children.push(xml `<tuning-step>${tuning.tuningStep}</tuning-step>`);
    }
    if (defined(tuning.tuningAlter)) {
        // <!ELEMENT tuning-alter (#PCDATA)>
        children.push(xml `<tuning-alter>${tuning.tuningAlter}</tuning-alter>`);
    }
    if (defined(tuning.tuningOctave)) {
        // <!ELEMENT tuning-octave (#PCDATA)>
        children.push(xml `<tuning-octave>${tuning.tuningOctave}</tuning-octave>`);
    }
    return children;
}
function transposeToXML(transpose) {
    // <!ELEMENT transpose
    //     (diatonic?, chromatic, octave-change?, double?)>
    // <!ATTLIST transpose
    //     number CDATA #IMPLIED
    // >
    let children = [];
    let attribs = numberLevelToXML(transpose);
    if (defined(transpose.diatonic)) {
        // <!ELEMENT diatonic (#PCDATA)>
        children.push(xml `<diatonic>${transpose.diatonic}</diatonic>`);
    }
    if (defined(transpose.chromatic)) {
        // <!ELEMENT chromatic (#PCDATA)>
        children.push(xml `<chromatic>${transpose.chromatic}</chromatic>`);
    }
    if (defined(transpose.octaveChange)) {
        // <!ELEMENT octave-change (#PCDATA)>
        children.push(xml `<octave-change>${transpose.octaveChange}</octave-change>`);
    }
    if (defined(transpose.double)) {
        // <!ELEMENT double EMPTY>
        children.push(xml `<double />`);
    }
    return dangerous `<transpose${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</transpose>`;
}
function directiveToXML(directive) {
    // <!ELEMENT directive (#PCDATA)>
    // <!ATTLIST directive
    //     %print-style;
    //     xml:lang NMTOKEN #IMPLIED
    // >
    let pcdata = xml `${directive.data}`;
    let attribs = printStyleToXML(directive); // TODO musicxml-interfaces xml:lang
    return dangerous `<directive${attribs}>${pcdata}</directive>`;
}
function measureStyleToXML(measureStyle) {
    // <!ELEMENT measure-style (multiple-rest |
    //     measure-repeat | beat-repeat | slash)>
    // <!ATTLIST measure-style
    //     number CDATA #IMPLIED
    //     %font;
    //     %color;
    // >
    let children = [];
    let attribs = "" +
        numberLevelToXML(measureStyle) +
        fontToXML(measureStyle) +
        colorToXML(measureStyle);
    // TODO: Make one at a time!!
    if (defined(measureStyle.multipleRest)) {
        children.push(multipleRestToXML(measureStyle.multipleRest));
    }
    if (defined(measureStyle.measureRepeat)) {
        children.push(measureRepeatToXML(measureStyle.measureRepeat));
    }
    if (defined(measureStyle.beatRepeat)) {
        children.push(beatRepeatToXML(measureStyle.beatRepeat));
    }
    if (defined(measureStyle.slash)) {
        children.push(slashElToXML(measureStyle.slash));
    }
    return dangerous `<measure-style${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</measure-style>`;
}
function multipleRestToXML(multipleRest) {
    // <!ELEMENT multiple-rest (#PCDATA)>
    // <!ATTLIST multiple-rest
    //     use-symbols %yes-no; #IMPLIED
    // >
    let attribs = "";
    let pcdata = xml `${multipleRest.count}`;
    if (defined(multipleRest.useSymbols)) {
        attribs += yesNo ` use-symbols="${multipleRest.useSymbols}"`;
    }
    return dangerous `<multiple-rest${attribs}>${pcdata}</multiple-rest>`;
}
function measureRepeatToXML(measureRepeat) {
    // <!ELEMENT measure-repeat (#PCDATA)>
    // <!ATTLIST measure-repeat
    //     type %start-stop; #REQUIRED
    //     slashes NMTOKEN #IMPLIED
    // >
    let attribs = "";
    let pcdata = xml `${measureRepeat.data || ""}`;
    attribs += startStopToXML(measureRepeat);
    // TODO: musicxml-interfaces: slashed -> slashes
    return dangerous `<measure-repeat${attribs}>${pcdata}</measure-repeat>`;
}
function beatRepeatToXML(beatRepeat) {
    // <!ELEMENT beat-repeat ((slash-type, slash-dot*)?)>
    // <!ATTLIST beat-repeat
    //     type %start-stop; #REQUIRED
    //     slashes NMTOKEN #IMPLIED
    //     use-dots %yes-no; #IMPLIED
    // >
    // <!ELEMENT slash-type (#PCDATA)>
    let children = [];
    let attribs = "" + startStopToXML(beatRepeat);
    // TODO: musicxml-interfaces: slases -> slashes
    if (defined(beatRepeat.useDots)) {
        attribs += yesNo ` use-dots="${beatRepeat.useDots}"`;
    }
    if (defined(beatRepeat.slashType)) {
        children.push(xml `<slash-type>${beatRepeat.slashType}</slash-type>`);
    }
    (beatRepeat.slashDots || []).forEach((dot) => {
        // <!ELEMENT slash-dot EMPTY>
        children.push(xml `<slash-dot />`);
    });
    return dangerous `<beat-repeat${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</beat-repeat>`;
}
function slashElToXML(slash) {
    // <!ELEMENT slash ((slash-type, slash-dot*)?)>
    // <!ATTLIST slash
    //     type %start-stop; #REQUIRED
    //     use-dots %yes-no; #IMPLIED
    //     use-stems %yes-no; #IMPLIED
    // >
    let attribs = startStopToXML(slash);
    if (defined(slash.useDots)) {
        attribs += yesNo ` use-dots="${slash.useDots}"`;
    }
    if (defined(slash.useStems)) {
        attribs += yesNo ` use-stems="${slash.useStems}"`;
    }
    let children = [];
    if (defined(slash.slashType)) {
        children.push(xml `<slash-type>${slash.slashType}</slash-type>`);
    }
    (slash.slashDots || []).forEach((dot) => {
        // <!ELEMENT slash-dot EMPTY>
        children.push(xml `<slash-dot />`);
    });
    return dangerous `<slash${attribs}>\n${children
        .join("\n")
        .split("\n")
        .map((n) => "  " + n)
        .join("\n")}\n</slash>`;
}
function printStyleToXML(printStyle) {
    // <!ENTITY % print-style
    //     "%position;
    //      %font;
    //      %color;">
    return (positionToXML(printStyle) + fontToXML(printStyle) + colorToXML(printStyle));
}
function printoutToXML(printout) {
    // <!ENTITY % printout
    //     "%print-object;
    //      print-dot     %yes-no;  #IMPLIED
    //      %print-spacing;
    //      print-lyric   %yes-no;  #IMPLIED">
    let attribs = printObjectToXML(printout);
    if (defined(printout.printDot)) {
        attribs += yesNo ` print-dot="${printout.printDot}"`;
    }
    attribs += printSpacingToXML(printout);
    if (defined(printout.printLyric)) {
        attribs += yesNo ` print-lyric="${printout.printLyric}"`;
    }
    return attribs;
}
function timeOnlyToXML(timeOnly) {
    // <!ENTITY % time-only
    //     "time-only CDATA #IMPLIED">
    if (defined(timeOnly.timeOnly)) {
        return xml ` time-only="${timeOnly.timeOnly}"`;
    }
    return "";
}
function editorialToXML(editorial) {
    // <!ENTITY % editorial "(footnote?, level?)">
    // <!ELEMENT footnote (#PCDATA)>
    // <!ATTLIST footnote
    //     %text-formatting;
    // >
    // <!ELEMENT level (#PCDATA)>
    // <!ATTLIST level
    //    reference %yes-no; #IMPLIED
    //    %level-display;
    // >
    // <!ELEMENT voice (#PCDATA)>
    let elements = [];
    if (defined(editorial.footnote) && !!editorial.footnote.text) {
        let footnoteEscaped = xml `${editorial.footnote.text}`;
        elements.push(dangerous `<footnote${textFormattingToXML(editorial.footnote)}>
            ${footnoteEscaped}</footnote>`);
    }
    if (defined(editorial.level) && !!editorial.level.text) {
        let levelEscaped = xml `${editorial.level.text}`;
        let attribs = "";
        if (defined(editorial.level.reference)) {
            attribs += yesNo ` reference="${editorial.level.reference}"`;
        }
        attribs += levelDisplayToXML(editorial.level);
        elements.push(dangerous `<level${attribs}>${levelEscaped}</level>`);
    }
    return elements;
}
function editorialVoiceToXML(editorial) {
    // <!ENTITY % editorial-voice "(footnote?, level?, voice?)">
    // <!ELEMENT footnote (#PCDATA)>
    // <!ATTLIST footnote
    //     %text-formatting;
    // >
    // <!ELEMENT level (#PCDATA)>
    // <!ATTLIST level
    //    reference %yes-no; #IMPLIED
    //    %level-display;
    // >
    let elements = editorialToXML(editorial);
    // <!ELEMENT voice (#PCDATA)>
    if (defined(editorial.voice)) {
        elements.push(xml `<voice>${editorial.voice}</voice>`);
    }
    return elements;
}
let solidDashedDottedWavyToXML = {
    1: "dashed",
    2: "dotted",
    3: "wavy",
    0: "solid",
};
function lineTypeToXML(lineType) {
    // <!ENTITY % line-type
    //     "line-type (solid | dashed | dotted | wavy) #IMPLIED">
    if (defined(lineType.lineType)) {
        return xml ` line-type="${solidDashedDottedWavyToXML[lineType.lineType]}"`;
    }
    return "";
}
function startStopToXML(startStop) {
    // <!ENTITY % start-stop "(start | stop)">
    if (defined(startStop.type)) {
        return xml ` type="${startStop.type === StartStop.Start ? "start" : "stop"}"`;
    }
    return "";
}
function startStopDiscontinueToXML(startStop) {
    // <!ENTITY % start-stop "(start | stop)">
    if (defined(startStop.type)) {
        return xml ` type="${startStopDiscontinueTypeToXML[startStop.type]}"`;
    }
    return "";
}
function numberLevelToXML(numberLevel) {
    if (defined(numberLevel.number)) {
        return xml ` number="${numberLevel.number}"`;
    }
    return "";
}
let startStopContinueSingleToXML = {
    0: "start",
    1: "stop",
    2: "continue",
    3: "single",
};
function startStopContinueToXML(startStopContinue) {
    // <!ENTITY % start-stop-continue "(start | stop | continue)">
    if (defined(startStopContinue.type)) {
        return xml ` type="${startStopContinueSingleToXML[startStopContinue.type]}"`;
    }
    return "";
}
function nameToXML(name) {
    if (defined(name.name)) {
        return xml ` name="${name.name}"`;
    }
    return "";
}
function startStopSingleToXML(startStopSingle) {
    // <!ENTITY % start-stop-single "(start | stop | single)">
    if (defined(startStopSingle.type)) {
        return xml ` type="${startStopContinueSingleToXML[startStopSingle.type]}"`;
    }
    return "";
}
function dashedFormattingToXML(dashedFormatting) {
    // <!ENTITY % dashed-formatting
    //     "dash-length   %tenths;  #IMPLIED
    //      space-length  %tenths;  #IMPLIED">
    let attribs = "";
    if (defined(dashedFormatting.dashLength)) {
        attribs += xml ` dash-length="${dashedFormatting.dashLength}"`;
    }
    if (defined(dashedFormatting.spaceLength)) {
        attribs += xml ` space-length="${dashedFormatting.spaceLength}"`;
    }
    return attribs;
}
let straightCurvedToXML = {
    1: "curved",
    0: "straight",
};
function lineShapeToXML(lineShape) {
    if (defined(lineShape.lineShape)) {
        return xml ` line-shape="${straightCurvedToXML[lineShape.lineShape]}"`;
    }
    return "";
}
function positionToXML(pos) {
    // <!ENTITY % position
    //     "default-x     %tenths;    #IMPLIED
    //      default-y     %tenths;    #IMPLIED
    //      relative-x    %tenths;    #IMPLIED
    //      relative-y    %tenths;    #IMPLIED">
    let attribs = "";
    if (defined(pos.defaultX)) {
        attribs += xml ` default-x="${pos.defaultX}"`;
    }
    if (defined(pos.defaultY)) {
        attribs += xml ` default-y="${pos.defaultY}"`;
    }
    if (defined(pos.relativeX)) {
        attribs += xml ` relative-x="${pos.relativeX}"`;
    }
    if (defined(pos.relativeY)) {
        attribs += xml ` relative-y="${pos.relativeY}"`;
    }
    return attribs;
}
function placementToXML(placement) {
    // <!ENTITY % placement
    //     "placement %above-below; #IMPLIED">
    if (placement.placement > AboveBelow.Unspecified) {
        return xml ` placement="${placement.placement === AboveBelow.Above ? "above" : "below"}"`;
    }
    return "";
}
function orientationToXML(orientation) {
    // <!ENTITY % orientation
    //     "orientation (over | under) #IMPLIED">
    if (orientation.orientation > OverUnder.Unspecified) {
        return xml ` orientation="${orientation.orientation === OverUnder.Over ? "over" : "under"}"`;
    }
    return "";
}
function bezierToXML(bezier) {
    // <!ENTITY % bezier
    //     "bezier-offset  CDATA     #IMPLIED
    //      bezier-offset2 CDATA     #IMPLIED
    //      bezier-x       %tenths;  #IMPLIED
    //      bezier-y       %tenths;  #IMPLIED
    //      bezier-x2      %tenths;  #IMPLIED
    //      bezier-y2      %tenths;  #IMPLIED">
    let attribs = "";
    if (defined(bezier.bezierOffset)) {
        attribs += xml ` bezier-offset="${bezier.bezierOffset}"`;
    }
    if (defined(bezier.bezierOffset2)) {
        attribs += xml ` bezier-offset2="${bezier.bezierOffset2}"`;
    }
    if (defined(bezier.bezierX)) {
        attribs += xml ` bezier-x="${bezier.bezierX}"`;
    }
    if (defined(bezier.bezierY)) {
        attribs += xml ` bezier-y="${bezier.bezierY}"`;
    }
    if (defined(bezier.bezierX2)) {
        attribs += xml ` bezier-x2="${bezier.bezierX2}"`;
    }
    if (defined(bezier.bezierY2)) {
        attribs += xml ` bezier-y2="${bezier.bezierY2}"`;
    }
    return attribs;
}
function fontToXML(font) {
    // <!ENTITY % font
    //     "font-family  CDATA  #IMPLIED
    //      font-style   CDATA  #IMPLIED
    //      font-size    CDATA  #IMPLIED
    //      font-weight  CDATA  #IMPLIED">
    let attribs = "";
    if (defined(font.fontFamily)) {
        attribs += xml ` font-family="${font.fontFamily}"`;
    }
    if (defined(font.fontStyle)) {
        attribs += xml ` font-style="${font.fontStyle === NormalItalic.Italic ? "italic" : "normal"}"`;
    }
    if (defined(font.fontSize)) {
        attribs += xml ` font-size="${font.fontSize}"`;
    }
    if (defined(font.fontWeight)) {
        attribs += xml ` font-weight="${font.fontWeight === NormalBold.Bold ? "bold" : "normal"}"`;
    }
    return attribs;
}
function printObjectToXML(printObject) {
    // <!ENTITY % print-object
    //     "print-object  %yes-no;  #IMPLIED">
    if (defined(printObject.printObject)) {
        return yesNo ` print-object="${printObject.printObject}"`;
    }
    return "";
}
function printSpacingToXML(printSpacing) {
    // <!ENTITY % print-spacing
    //     "print-spacing %yes-no;  #IMPLIED">
    if (defined(printSpacing.printSpacing)) {
        return yesNo ` print-spacing="${printSpacing.printSpacing}"`;
    }
    return "";
}
function textFormattingToXML(textFormatting) {
    // <!ENTITY % text-formatting
    //     "%justify;
    //      %print-style-align;
    //      %text-decoration;
    //      %text-rotation;
    //      %letter-spacing;
    //      %line-height;
    //      xml:lang NMTOKEN #IMPLIED TODO musicxml-interfaces
    //      xml:space (default | preserve) #IMPLIED TODO musicxml-interfaces
    //      %text-direction;
    //      %enclosure;">
    return ("" +
        justifyToXML(textFormatting) +
        printStyleAlignToXML(textFormatting) +
        textDecorationToXML(textFormatting) +
        textRotationToXML(textFormatting) +
        letterSpacingToXML(textFormatting) +
        lineHeightToXML(textFormatting) +
        textDirectionToXML(textFormatting) +
        enclosureToXML(textFormatting));
}
let leftCenterRightToXML = {
    1: "right",
    2: "center",
    0: "left",
};
function justifyToXML(justify) {
    if (defined(justify.justify)) {
        return xml ` justify="${leftCenterRightToXML[justify.justify]}"`;
    }
    return "";
}
function halignToXML(halign) {
    if (defined(halign.halign)) {
        return xml ` halign="${leftCenterRightToXML[halign.halign]}"`;
    }
    return "";
}
function valignToXML(valign) {
    if (defined(valign.valign)) {
        return xml ` valign="${topMiddleBottomBaselineToXML[valign.valign]}"`;
    }
    return "";
}
function printStyleAlignToXML(printStyleAlign) {
    return ("" +
        printStyleToXML(printStyleAlign) +
        halignToXML(printStyleAlign) +
        valignToXML(printStyleAlign));
}
function textDecorationToXML(textDecoration) {
    // <!ENTITY % text-decoration
    //     "underline  %number-of-lines;  #IMPLIED
    //      overline  %number-of-lines;   #IMPLIED
    //      line-through  %number-of-lines;   #IMPLIED">
    let attribs = "";
    if (defined(textDecoration.underline)) {
        attribs += xml ` underline="${textDecoration.underline}"`;
    }
    if (defined(textDecoration.overline)) {
        attribs += xml ` overline="${textDecoration.overline}"`;
    }
    if (defined(textDecoration.lineThrough)) {
        attribs += xml ` line-through="${textDecoration.lineThrough}"`;
    }
    return attribs;
}
function textRotationToXML(textRotation) {
    let attribs = "";
    if (defined(textRotation.rotation)) {
        attribs += xml ` rotation="${textRotation.rotation}"`;
    }
    return attribs;
}
function letterSpacingToXML(letterSpacing) {
    let attribs = "";
    if (defined(letterSpacing.letterSpacing)) {
        attribs += xml ` letter-spacing="${letterSpacing.letterSpacing}"`;
    }
    return attribs;
}
function lineHeightToXML(lineHeight) {
    let attribs = "";
    if (defined(lineHeight.lineHeight)) {
        attribs += xml ` line-height="${lineHeight.lineHeight}"`;
    }
    return attribs;
}
let directionModeToXML = {
    0: "ltr",
    1: "rtl",
    2: "lro",
    3: "rlo",
};
function textDirectionToXML(textDirection) {
    // <!ENTITY % text-direction
    //     "dir (ltr | rtl | lro | rlo) #IMPLIED">
    let attribs = "";
    if (defined(textDirection.dir)) {
        attribs += xml ` dir="${directionModeToXML[textDirection.dir]}"`;
    }
    return attribs;
}
let enclosureShapeToXML = {
    3: "circle",
    4: "bracket",
    5: "triangle",
    6: "diamond",
    7: "none",
    1: "square",
    2: "oval",
    0: "rectangle",
};
function enclosureToXML(enclosure) {
    let attribs = "";
    if (defined(enclosure.enclosure)) {
        attribs += xml ` enclosure="${enclosureShapeToXML[enclosure.enclosure]}"`;
    }
    return attribs;
}
function levelDisplayToXML(levelDisplay) {
    let attribs = "";
    if (defined(levelDisplay.bracket)) {
        attribs += yesNo ` bracket="${levelDisplay.bracket}"`;
    }
    if (levelDisplay.size >= SymbolSize.Unspecified) {
        attribs += xml ` size="${symbolSizeToXML[levelDisplay.size]}"`;
    }
    if (defined(levelDisplay.parentheses)) {
        attribs += yesNo ` parentheses="${levelDisplay.bracket}"`;
    }
    return attribs;
}
function bendSoundToXML(bendSound) {
    let attribs = "";
    if (defined(bendSound.accelerate)) {
        attribs += yesNo ` accelerate="${bendSound.accelerate}"`;
    }
    if (defined(bendSound.beats)) {
        attribs += xml ` beats="${bendSound.beats}"`;
    }
    if (defined(bendSound.firstBeat)) {
        attribs += xml ` first-beat="${bendSound.firstBeat}"`;
    }
    if (defined(bendSound.lastBeat)) {
        attribs += xml ` last-beat="${bendSound.lastBeat}"`;
    }
    return attribs;
}
let upperMainBelowToXML = {
    1: "main",
    2: "below",
    0: "upper",
};
let wholeHalfUnisonToXML = {
    2: "unison",
    0: "whole",
    1: "half",
};
let wholeHalfNoneToXML = {
    3: "none",
    0: "whole",
    1: "half",
};
function trillSoundToXML(trillSound) {
    // <!ENTITY % trill-sound
    //     "start-note    (upper | main | below)  #IMPLIED
    //      trill-step    (whole | half | unison) #IMPLIED
    //      two-note-turn (whole | half | none)   #IMPLIED
    //      accelerate    %yes-no; #IMPLIED
    //      beats         CDATA    #IMPLIED
    //      second-beat   CDATA    #IMPLIED
    //      last-beat     CDATA    #IMPLIED">
    let attribs = "";
    if (defined(trillSound.startNote)) {
        attribs += xml ` start-note="${upperMainBelowToXML[trillSound.startNote]}"`;
    }
    if (defined(trillSound.trillStep)) {
        attribs += xml ` trill-step="${wholeHalfUnisonToXML[trillSound.trillStep]}"`;
    }
    if (defined(trillSound.twoNoteTurn)) {
        attribs += xml ` two-note-turn="${wholeHalfNoneToXML[trillSound.twoNoteTurn]}"`;
    }
    if (defined(trillSound.accelerate)) {
        attribs += yesNo ` accelerate="${trillSound.accelerate}"`;
    }
    if (defined(trillSound.beats)) {
        attribs += xml ` beats="${trillSound.beats}"`;
    }
    if (defined(trillSound.secondBeat)) {
        attribs += xml ` second-beat="${trillSound.secondBeat}"`;
    }
    if (defined(trillSound.lastBeat)) {
        attribs += xml ` last-beat="${trillSound.lastBeat}"`;
    }
    return attribs;
}
function slashToXML(slash) {
    if (defined(slash.slash)) {
        return yesNo ` slash="${slash.slash}"`;
    }
    return "";
}
function mordentSubsetToXML(mordent) {
    //     long %yes-no; #IMPLIED
    //     approach %above-below; #IMPLIED
    //     departure %above-below; #IMPLIED
    let attribs = "";
    if (defined(mordent.long)) {
        attribs += yesNo ` long="${mordent.long}"`;
    }
    if (defined(mordent.approach)) {
        attribs += xml ` approach="${mordent.approach === AboveBelow.Above ? "above" : "below"}"`;
    }
    if (defined(mordent.departure)) {
        attribs += xml ` departure="${mordent.departure === AboveBelow.Above ? "above" : "below"}"`;
    }
    return attribs;
}
function upDownToXML(upDown) {
    if (defined(upDown.type)) {
        return xml ` type="${upDown.type ? "down" : "up"}"`;
    }
    return "";
}
function upDownDirectionToXML(direction) {
    if (defined(direction.direction)) {
        return xml ` type="${direction.direction ? "down" : "up"}"`;
    }
    return "";
}
function topBottomToXML(topBottom) {
    if (defined(topBottom.type)) {
        return xml ` type="${topBottom.type ? "bottom" : "top"}"`;
    }
    return "";
}
function colorToXML(color) {
    // <!ENTITY % color
    //     "color CDATA #IMPLIED">
    if (defined(color.color)) {
        return xml ` color="${color.color}"`;
    }
    return "";
}
