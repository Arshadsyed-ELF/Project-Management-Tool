import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function CardList({ cards }) {
  return (
    <CardListContainer>
      {cards.map((card, index) => (
        <Card key={index} title={card.title} description={card.description} />
      ))}
    </CardListContainer>
  );
}

export default CardList;
