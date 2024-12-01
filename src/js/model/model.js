//store data and handles business logic
class Model {
    constructor() {
        this.state = {json:{}, option:'', path:'', copy:'', space:2}
    }
    getJson() {
        return this.state.json;
    }
    setJson(json) {
        this.state.json = json;
    }
    getPath() {
        return this.state.path;
    }
    setPath(path) {
        this.state.path = path;
    }
    getOption() {
        return this.state.option;
    }
    setOption(option) {
        this.state.option = option;
    }
    getCopy() {
        return this.state.copy;
    }
    setCopy(copy) {
        this.state.copy = copy;
    }
    getSpace() {
        return this.state.space;
    }
    setSpace(space) {
        this.state.space = space;
    }
}
export {Model};