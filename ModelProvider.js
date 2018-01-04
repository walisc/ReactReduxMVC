import React , {Component, Children} from 'react';
import { storeShape } from './PropTypes'
import { connect } from 'react-redux'

// Need to add teh class.contextType for each Child
export default class ModelProvider extends Component{

    constructor(props)
    {
        super(props)
        this.appModels = this.props.models;
        this.store = this.props.store;

        let update_model_with_store = (model) => {
            model["store"] = this.store.getState()[model.GetModelType()]
            return model
        }
        this.models = this.appModels
            .reduce((reducer, model) =>
                Object.assign({}, reducer, {[model.GetModelType()]: update_model_with_store(model)}
                ), {}
            )
    }

    componentWillUpdate()
    {
        let update_model_with_store = (model) => {
            model["store"] = this.store.getState()[model.GetModelType()]
            return model
        }
        this.models = this.appModels
            .reduce((reducer, model) =>
                Object.assign({}, reducer, {[model.GetModelType()]: update_model_with_store(model)}
                ), {}
            )
    }

    shouldComponentUpdate()
    {
        return true
    }
    render()
    {
        return this.props.children
    }

    getChildContext(store)
    {
        store = store || this.store;

        return {
            store: store,
            models: this.models
        }
    }
}

ModelProvider.childContextTypes = {
    store: storeShape.isRequired,
    models: React.PropTypes.object.isRequired
}

ModelProvider.propTypes ={
    store: storeShape.isRequired,
    models: React.PropTypes.array.isRequired
}