import { createStore } from 'redux'
import { combineReducers } from 'redux'

export function ModuleLoader(appModels)
{
    
    let modelReducers = appModels.reduce((reducers, model) => {return Object.assign({} ,reducers , {[model.GetModelType()]: model.Reducer}) }, {});

    let app_models_store = createStore(combineReducers(modelReducers));

    appModels.map((model) => model.SetStoreDispatcher(app_models_store.dispatch));
    
    return {
        
        store: app_models_store,
        appModels: appModels
    }
    
}