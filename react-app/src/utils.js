import React from 'react'
import { Iterable } from 'immutable'




export const filterSelectInfo = (data, keys = ['cname', 'score']) =>
    data.map(ele => keys.reduce((aac, val) => (aac[val] = ele[val], aac), {}))

    



export const toJS = WrappedComponent => wrappedComponentProps => {
    const KEY = 0
    const VALUE = 1

    const propsJS = Object.entries(wrappedComponentProps).reduce(
    (newProps, wrappedComponentProp) => {
        newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
        wrappedComponentProp[VALUE]
        )
        ? wrappedComponentProp[VALUE].toJS()
        : wrappedComponentProp[VALUE]
        return newProps
    },
    {}
    )

    return <WrappedComponent {...propsJS} />
}

const decamelizeString = (string, options) => {
    options = options || {};
    var separator = options.separator || '_';
    var split = options.split || /(?=[A-Z])/;

    return string.split(split).join(separator).toLowerCase();
};

export const decamelizeKeys = (obj) =>
    Object.keys(obj).reduce((aac, val) => (aac[decamelizeString(val)] = obj[val], aac ), {})

      

