import React, { Component } from 'react'
import { storeShape } from './PropTypes'

export default class BaseComponent extends React.Component{

    static contextTypes = {
        models: React.PropTypes.object.isRequired,
        store: storeShape.isRequired,
        intl: React.PropTypes.object.isRequired
    }

    fDispatcher(function_to_call, function_props)
    {
        this.context.store.dispatch({type: function_to_call, payLoad: function_props})
    }
    
    constructor(props, context)
    {
        super(props, context)
        this.models = this.context.models
    }

    filter_models()
    {
        return [];
    }

}