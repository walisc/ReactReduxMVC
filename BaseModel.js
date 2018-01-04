

export default class BaseModel {

    constructor()
    {
        this.dispatcher = null
        this.Reducer = this.Reducer.bind(this);
    }

    // Rememeber this will get called by all models as they use this are their reduces
    Reducer(state = this.GetModelInitialState(null), action)
    {
        //TODO: Better error handling, let user now, model and function attempt
        if (typeof action.type !== "function") {
            return {...state}
        }
        if (!(action.type.name in this))
        {
            return {...state}
        }

        return this[action.type.name](state, action.payLoad)
    }

    FunctionDispatcher(FunctionName, FunctionProps)
    {
        this.dispatcher({type: FunctionName, payLoad: FunctionProps})    
    }
    
    GetModelInitialState(id){
        return {}
    }

    SetStoreDispatcher(dispatcher)
    {
        this.dispatcher = dispatcher;
    }

    ActionDispatcher(actionType, payLoad, shouldDispatch=true)
    {
        if (!shouldDispatch || this.dispatcher ==null) {
            return {
                type: actionType,
                payLoad
            }
        }
        else
        {
            this.dispatcher({
                type: actionType,
                payLoad
            })
        }
    }

    /**
     * @return {string}
     */
    GetModelType() {
        return "Mot Defined"
    }
}