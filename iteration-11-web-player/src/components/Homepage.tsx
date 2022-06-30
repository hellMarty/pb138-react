import {Col, Container, Row} from 'react-bootstrap';
import {Queue} from './Queue';
import {Library} from './Library';
import {Player} from './Player/Player';
import {Stats} from './Stats';

export const Homepage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Web music player</h1>
        </Col>
      </Row>
      <Queue />
      <Library />
      <Player />
      <Stats />
    </Container>
  );
};
