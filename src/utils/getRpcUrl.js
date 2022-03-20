export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2]

const getNodeUrl = () => {
    return nodes[0];
}

export default getNodeUrl;