import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';

const WorkItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  height: 20px;
  margin-bottom: 10px;
`;

const Circle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background: #7C97FE;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 50%;
  margin-right: 20px;
  margin-left: 5px;
`;

const Deadline = styled.div`
  width: 45px;
  height: 20px;
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 15px;
  margin-left: 15px;
  font-size: 12px;
  font-weight: bold;
  background: ${props => props.isUrgent ? '#FD5B5B' : '#7C97FE'};
`;

const TextWrapper = styled.div`
  flex: 1;
  display: flex;
`;

const Text = styled.div`
  font-size: 14px;
  color: #495057;
  position: relative;
  display: inline-block;

  ${props =>
    props.done && 
    css`
      color: #ced4da;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 1px;
        width: 100%;
        background-color: #7C97FE;
        z-index: 1;
      }
    `}
`;

const WorkItem = ({ text, deadline }) => {
  const today = moment();
  const endDate = moment(deadline);
  const diffDays = endDate.diff(today, 'days');
  const isUrgent = diffDays <= 5;

  return (
    <WorkItemBlock>
      <Circle></Circle>
      <TextWrapper>
        <Text>{text}</Text>
        <Deadline isUrgent={isUrgent}>{`D-${diffDays}`}</Deadline>
      </TextWrapper>
    </WorkItemBlock>
  );
};

export default WorkItem;
