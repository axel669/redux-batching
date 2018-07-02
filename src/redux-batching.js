const gen = (store) => {
    const action = (type, constructor = (() => ({})), dispatches = true) => {
        const method = (...args) => {
            const obj = {
                type,
                ...constructor(...args)
            }
            return obj;
        };
        if (dispatches === true) {
            method.dispatch = (...args) => {
                store.dispatch(
                    method(...args)
                );
            };
        }
        return method;
    };
    const batch = action(
        'batch',
        (...actions) => ({
            actions
        })
    );

    return {action, batch};
};

const batchReducer = (func) => {
    return (state, action) => {
        if (action.type === 'batch') {
            return action.actions.reduce(
                (state, action) => func(state, action),
                state
            );
        }
        return func(state, action);
    };
};

export {batchReducer, gen};
