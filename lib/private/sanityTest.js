"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const builders_1 = require("../builders");
let acc = (0, builders_1.buildAccidental)(builder => builder.accidental(index_1.MxmlAccidental.Sharp));
let note1 = (0, builders_1.buildNote)(builder => builder
    .accidental(acc));
let note2 = (0, builders_1.buildNote)(builder => builder
    .accidental(builder => builder.accidental(index_1.MxmlAccidental.Sharp)));
let note3 = (0, builders_1.buildNote)(builder => builder
    .accidental(builder => builder
    .accidental(index_1.MxmlAccidental.Sharp))
    .beamsAt(0, builder => builder
    .number(1)
    .type(index_1.BeamType.Begin)));
let p3 = (0, builders_1.patchNote)(null, builder => builder
    .accidental(builder => builder
    .accidental(index_1.MxmlAccidental.Sharp))
    .beamsAt(0, builder => builder
    .number(1)
    .type(index_1.BeamType.Begin)));
let p4 = (0, builders_1.patchNote)(note3, builder => builder
    .beamsAt(0, builder => builder
    .number(1)
    .type(index_1.BeamType.Begin)
    .repeater(true))
    .beamsAt(1, builder => builder
    .number(1)
    .type(index_1.BeamType.Begin)
    .repeater(false)));
let p5 = (0, builders_1.patchNote)(note3, builder => builder
    .beamsSplice(0, 1, (0, builders_1.buildBeam)(beam => beam
    .number(1)
    .type(index_1.BeamType.Begin)
    .fan(index_1.AccelRitNone.Accel))));
console.log((0, index_1.serializeNote)(note1));
console.log((0, index_1.serializeNote)(note2));
console.log((0, index_1.serializeNote)(note3));
console.log(p3);
console.log(p4);
console.log(p5);
