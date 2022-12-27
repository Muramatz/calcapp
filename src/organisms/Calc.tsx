import React, { useState, useEffect } from 'react';
import Button from "../atoms/Button";
import Display from "../atoms/Display";
import styled from 'styled-components';

const Operator = {
  'add': '+',
  'sub': '-',
  'div': '/',
  'mul': '*',
  'mod': '%',
};

const MaxLength = 16;

export const Calculator: React.FC = () => {
  const [calculation, setCalculation] = useState<boolean>(false);
  const [input, setInput] = useState<string>('0');
  const [queues, setQueues] = useState<string[]>([]);
  const [orders, setOrders] = useState<string[]>([]);
  const [operation, setOperation] = useState<string | null>();
  const [decimalFlag, setDecimalFlag] = useState<boolean>(false);
  const [negativeFlag, setNegativeFlag] = useState<boolean>(false);

  const entry = (val: string) => {
    if (operation) {
      setQueues([...queues, negativeFlag ? '-' + input : input]);
      setOrders([...orders, operation]);
      setOperation(null);
      setNegativeFlag(false);
      setInput(val);
    } else {
      if (input.replace('.', '').length === MaxLength) return;
      if (input.length === 1 && input === '0' && !decimalFlag) {
        setInput(val);
      } else if (decimalFlag) {
        setInput(input + '.' + val);
        setDecimalFlag(false);
      } else {
        setInput(input + val);
      }
    }
  };

  const checkDecimal = () => {
    if (!input.includes('.')) {
      setDecimalFlag(true);
    }
  }

  const clearEntry = () => {
    setDecimalFlag(false);
    setNegativeFlag(false);
    setInput('0');
    setOperation('');
  }

  const clearAll = () => {
    setDecimalFlag(false);
    setNegativeFlag(false);
    setInput('0');
    setOperation('');
    setOrders([]);
    setQueues([]);
  };

  const calc = () => {
    if (queues.length === 0) {
      return;
    }

    setQueues([...queues, negativeFlag ? '-' + input : input]);
    setCalculation(true);
  };

  const validLength = (string: string) => {
    return string.replace('.', '').length <= MaxLength;
  }

  useEffect(() => {
    if (queues.length === 0) return;
    let calc: string = '';
    let index: number = 0;
    queues.forEach((queue) => {
      if (calc === '') {
        calc = queue;
      } else {
        calc = eval((calc + orders[index] + queue).replace('--', '+')).toString();
        index++;
      }
    })

    clearAll();

    if (!Number(calc) && calc !== '0') {
      alert('Error!');
    } else if (Number(calc) < 0) {
      setNegativeFlag(true);
      let replaced = calc.replace('-', '');
      if (!validLength(replaced)) {
        replaced = replaced.substring(0, MaxLength);
      }
      setInput(replaced);
    } else {
      if (!validLength(calc)) {
        calc = calc.substring(0, MaxLength);
      }
      setInput(calc);
    }
    setCalculation(false);
  }, [calculation]);


  return (
    <Board>
      <Display>{(negativeFlag ? '-' : '') + input}</Display>
      <Row>
        <Button onClick={ () => clearAll() } isColored={ true }>AC</Button>
        <Button onClick={ () => setNegativeFlag(!negativeFlag) } isColored={ true }>±</Button>
        <Button onClick={ () => setOperation(Operator.mod) } isColored={ true }>%</Button>
        <Button onClick={ () => setOperation(Operator.div) } isColored={ true }>÷</Button>
      </Row>
      <Row>
        <Button onClick={ () => entry('7') } isColored={false}>7</Button>
        <Button onClick={ () => entry('8') } isColored={false}>8</Button>
        <Button onClick={ () => entry('9') } isColored={false}>9</Button>
        <Button onClick={ () => setOperation(Operator.mul) } isColored={ true }>×</Button>
      </Row>
      <Row>
        <Button onClick={ () => entry('4') } isColored={false}>4</Button>
        <Button onClick={ () => entry('5') } isColored={false}>5</Button>
        <Button onClick={ () => entry('6') } isColored={false}>6</Button>
        <Button onClick={ () => setOperation(Operator.sub) } isColored={ true }>–</Button>
      </Row>
      <Row>
        <Button onClick={ () => entry('1') } isColored={false}>1</Button>
        <Button onClick={ () => entry('2') } isColored={false}>2</Button>
        <Button onClick={ () => entry('3') } isColored={false}>3</Button>
        <Button onClick={ () => setOperation(Operator.add) } isColored={ true }>+</Button>
      </Row>
      <Row>
        <Button onClick={ () => entry('0') } isColored={false}>0</Button>
        <Button onClick={ () => checkDecimal() } isColored={false}>.</Button>
        <Button onClick={ () => clearEntry() } isColored={ true }>C</Button>
        <Button onClick={ () => calc() } isColored={ true }>=</Button>
      </Row>
    </Board>
  )
}

const Board = styled.div`
  margin: 0 auto;
  height: 550px;
  width: 400px;
  background: #eee;
  padding: 20px;
`

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px; 
`
