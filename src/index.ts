import '../public/index.html';
import { Map } from './map.ts';

$(function () {
    const map = new Map();
    map.createMap();
});