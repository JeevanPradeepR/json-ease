import { Model } from "./model/model.js";
import { Controller } from "./controller/controller.js";
import { View } from "./view/view.js";
const app = new Controller(new Model(), new View());