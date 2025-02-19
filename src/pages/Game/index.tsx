import React, { useState } from "react";
import { Button, Input, Card } from "antd";

const GuessNumberGame = () => {
    const [randomNumber, setRandomNumber] = useState(
        Math.floor(Math.random() * 100)
    );
    const [guestNumber, setGuestNumber] = useState('');
    const [message, setMessage] = useState('Vui lòng nhập số trong khoảng từ 1 đến 100');
    const [count, setCount] = useState(0);

    const check = () => {
        if (count > 9) {
            setMessage(`Bạn đã hết lượt chơi! Số đúng là ${randomNumber}`);
            return;
        }

        const guess = parseInt(guestNumber, 10);
        if (isNaN(guess)) {
            setMessage("Vui lòng nhập một số hợp lệ!");
            return;
        }
          
        setCount(count + 1);

        if (guess > randomNumber) {
            setMessage("Số bạn đoán lớn hơn số cần tìm!");
            return;
        }
        else if (guess < randomNumber) {
            setMessage("Số bạn đoán nhỏ hơn số cần tìm!");
            return;
        }
        else {
            setMessage("Chúc mừng bạn đã đoán đúng số!");
            return;
        }
    }


    const reset = () => {
        setRandomNumber(Math.floor(Math.random() * 100));
        setGuestNumber('');
        setMessage('Vui lòng nhập số trong khoảng từ 1 đến 100');
        setCount(0);
    }

  return (
    <Card style={{ width: 400, margin: "20px auto", textAlign: "center" }}>
        <h1 style={{color:""}}>Trò chơi đoán số</h1>
        <p>{message}</p>
        <p>Lượt chơi còn lại: {10-count}</p>
        <Input 
            type="number"
            value={guestNumber}
            onChange={(e) => setGuestNumber(e.target.value)}
            onPressEnter={check}
            placeholder="Nhập số" />
        <Button 
            type="primary" 
            onClick={check}
            style={{ margin: "10px" }}
        >
          Kiểm tra
        </Button>
        <Button 
            type="primary"
            onClick={reset}
        >
            Chơi lại
        </Button>
    </Card>
  );
};

export default GuessNumberGame;
