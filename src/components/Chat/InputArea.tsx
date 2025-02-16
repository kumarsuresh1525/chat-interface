import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

const InputContainer = styled.div`
  display: flex;
  padding: 20px;
  gap: 10px;
  background: white;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.primary};
  color: white;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MicButton = styled(Button)<{ $isListening: boolean }>`
  background: ${({ theme, $isListening }) =>
    $isListening ? theme.secondary : theme.primary};
`;

interface InputAreaProps {
  onSendMessage: (content: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  const { transcript, isListening, startListening, stopListening } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <InputContainer>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <InputWrapper>
          <TextInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <MicButton
            type="button"
            onClick={handleMicClick}
            $isListening={isListening}
          >
            {isListening ? 'Stop' : 'Mic'}
          </MicButton>
          <Button type="submit" disabled={!input.trim()}>
            Send
          </Button>
        </InputWrapper>
      </form>
    </InputContainer>
  );
};

export default InputArea; 