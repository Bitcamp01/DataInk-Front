import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

const CustomGroupNode = ({ data }) => {
    const { groupNodes } = data;

    return (
        <div style={{ border: '1px solid #777', padding: '10px', backgroundColor: '#f9f9f9' }}>
            <div>
                <strong>{data.label}</strong>
            </div>
            <div style={{ marginTop: '10px' }}>
                {groupNodes.map((node) => (
                    <div
                        key={node.id}
                        style={{
                            padding: '5px',
                            margin: '5px',
                            border: '1px solid #aaa',
                            backgroundColor: '#fff',
                        }}
                    >
                        {node.label}
                    </div>
                ))}
            </div>
            <Handle type="target" position="top" style={{ background: '#555' }} />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </div>
    );
};

export default memo(CustomGroupNode);
