import React, { useState, useEffect, useCallback } from "react";

import ReactFlow, {
    isEdge,
    addEdge,
    MiniMap,
    Controls
} from "react-flow-renderer";
import ColorSelectorNode from "./ColorSelectorNode";

// import "./styles.css";

const onNodeDragStop = (event, node) => console.log("drag stop", node);
const onElementClick = (event, element) => console.log("click", element);

const initBgColor = "#b1b0bf";

const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [20, 20];
const nodeTypes = {
    selectorNode: ColorSelectorNode
};

const CustomNodeFlow = () => {
    const [reactflowInstance, setReactflowInstance] = useState(null);
    const [elements, setElements] = useState([]);
    const [bgColor, setBgColor] = useState(initBgColor);

    useEffect(() => {
        const onChange = (event) => {
            setElements((els) =>
                els.map((e) => {
                    if (isEdge(e) || e.id !== "2") {
                        return e;
                    }

                    const color = event.target.value;

                    setBgColor(color);

                    return {
                        ...e,
                        data: {
                            ...e.data,
                            color
                        }
                    };
                })
            );
        };

        //update JSON here...
        setElements([
            {
                id: "1",
                // type: "input",
                data: { label: "Source-Cluster" },
                position: { x: 0, y: 50 },
                style: { border: "1px solid #777", padding: 10 },
                sourcePosition: "right",
                targetPosition: "bottom"
            },
            {
                id: "11",
                type: "input",
                data: { label: "Backupplan" },
                position: { x: 0, y: 150 },
                style: { border: "1px solid #777", padding: 10 },
                sourcePosition: "top"
            },
            {
                id: "2",
                type: "selectorNode",
                data: { onChange: onChange, color: initBgColor },
                style: { border: "1px solid #777", padding: 10 },
                position: { x: 300, y: 200 }
            },
            {
                id: "3",
                // type: "output",
                data: { label: "Site Cluster A" },
                position: { x: 650, y: 25 },
                targetPosition: "left",
                sourcePosition: "right"
            },
            {
                id: "31",
                data: { label: "Consistent sets" },
                type: "output",
                position: { x: 950, y: 25 },
                targetPosition: "left"
            },
            {
                id: "4",
                type: "output",
                data: { label: "Site Cluster B" },
                position: { x: 650, y: 100 },
                targetPosition: "left"
            },
            {
                id: "5",
                type: "output",
                data: { label: "Site Cluster C" },
                position: { x: 650, y: 175 },
                targetPosition: "left"
            },
            {
                id: "6",
                type: "output",
                data: { label: "Site Cluster D" },
                position: { x: 650, y: 250 },
                targetPosition: "left"
            },
            {
                id: "7",
                type: "output",
                data: { label: "Site Cluster E" },
                position: { x: 650, y: 325 },
                targetPosition: "left"
            },
            {
                id: "8",
                type: "output",
                data: { label: "Site Cluster F" },
                position: { x: 650, y: 400 },
                targetPosition: "left"
            },
            {
                id: "9",
                type: "output",
                data: { label: "Site Cluster G" },
                position: { x: 650, y: 475 },
                targetPosition: "left"
            },
            {
                id: "10",
                type: "output",
                data: { label: "Site Cluster H" },
                position: { x: 650, y: 250 },
                targetPosition: "left"
            },
            {
                id: "e1-2",
                source: "1",
                target: "2",
                animated: true,
                style: { stroke: "#fff" }
            },
            {
                id: "e2a-3",
                source: "2",
                target: "3",
                sourceHandle: "a",
                animated: true,
                style: { stroke: "#fff" }
            },
            {
                id: "e2b-4",
                source: "2",
                target: "4",
                // sourceHandle: "b",
                sourceHandle: "a",
                animated: true,
                style: { stroke: "#fff" }
            },
            {
                id: "e2b-5",
                source: "2",
                target: "5",
                // sourceHandle: "b",
                sourceHandle: "a",
                animated: true,
                style: { stroke: "#fff" }
            },
            {
                id: "e2b-6",
                source: "2",
                target: "6",
                // sourceHandle: "b",
                sourceHandle: "a",
                animated: true,
                style: { stroke: "#fff" }
            },
            {
                id: "e2b-7",
                source: "2",
                target: "7",
                // sourceHandle: "b",
                sourceHandle: "a",
                animated: true,
                style: { stroke: "#fff" }
            },
            {
                id: "e2b-8",
                source: "2",
                target: "8",
                // sourceHandle: "b",
                sourceHandle: "a",
                animated: true,
                style: { stroke: "#fff" }
            },
            {
                id: "e2b-9",
                source: "2",
                target: "9",
                // sourceHandle: "b",
                sourceHandle: "a",
                animated: true,
                style: { stroke: "#fff" }
            },
            {
                id: "e2b-10",
                source: "2",
                target: "10",
                // sourceHandle: "b",
                sourceHandle: "a",
                animated: true,
                style: { stroke: "#fff" }
            },
            {
                id: "3-31",
                source: "3",
                target: "31",
                // sourceHandle: "b",
                sourceHandle: "a",
                animated: false,
                type: "smoothstep",
                style: { stroke: "#fff" }
            },
            {
                id: "1-11",
                source: "11",
                target: "1",
                // sourceHandle: "b",
                sourceHandle: "a",
                animated: false,
                type: "smoothstep",
                style: { stroke: "#fff" }
            }
        ]);
    }, []);

    useEffect(() => {
        if (reactflowInstance && elements.length > 0) {
            reactflowInstance.fitView();
        }
    }, [reactflowInstance, elements.length]);

    const onElementsRemove = useCallback((elementsToRemove) => {
        setElements((els) => els.filter((el) => !elementsToRemove.includes(el)));
    }, []);
    const onConnect = useCallback(
        (params) =>
            setElements((els) =>
                addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, els)
            ),
        []
    );

    const onLoad = useCallback(
        (rfi) => {
            if (!reactflowInstance) {
                setReactflowInstance(rfi);
                console.log("flow loaded:", rfi);
            }
        },
        [reactflowInstance]
    );

    return (
        <ReactFlow
            elements={elements}
            onElementClick={onElementClick}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onNodeDragStop={onNodeDragStop}
            style={{ background: bgColor }}
            onLoad={onLoad}
            nodeTypes={nodeTypes}
            connectionLineStyle={connectionLineStyle}
            snapToGrid={true}
            snapGrid={snapGrid}
            defaultZoom={1.5}
        >
            <MiniMap
                nodeStrokeColor={(n) => {
                    if (n.type === "input") return "#0041d0";
                    if (n.type === "selectorNode") return bgColor;
                    if (n.type === "output") return "#ff0072";
                }}
                nodeColor={(n) => {
                    if (n.type === "selectorNode") return bgColor;
                    return "#fff";
                }}
            />
            <Controls />
        </ReactFlow>
    );
};

export default CustomNodeFlow;
