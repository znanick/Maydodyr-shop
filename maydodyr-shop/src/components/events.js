import { EventEmitter } from "events";

var reloadData = new EventEmitter();
var addToCart = new EventEmitter();

export { reloadData, addToCart };
