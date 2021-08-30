import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import Unit from './Unit';
import { downloadUnits, getHoursToDownload as getTImeToDownload } from './utils';

function App() {
  const [downloadRate, setDownloadRate] = useState('1.1');
  const [downloadRateUnits, setDownloadRateUnits] = useState(Unit.MEGABIT);
  const [totalSize, setTotalSize] = useState('80');
  const [totalSizeUnits, setTotalSizeUnits] = useState(Unit.GIGABYTE);

  return (
    <>
      <h2 className="text-center mt-2">Download Calculator</h2>

      <Container >
        <Row>
          <Col sm={{ offset: '3', span: '3' }}>
            <Form.Group className="mb-3" controlId="downloadRate">
              <Form.Label className="text-nowrap">Download Rate:</Form.Label>
              <Form.Control value={downloadRate} onChange={e => setDownloadRate(e.target.value)} />
            </Form.Group>
          </Col>
          <Col sm="3">
            <Form.Group className="mb-3" controlId="downloadRateUnits">
              <Form.Label>Units:</Form.Label>
              <Form.Select value={downloadRateUnits} onChange={(e: any) => setDownloadRateUnits(e.target.value as unknown as Unit)}>
                {downloadUnits.map(option => <option key={option.value} value={option.value}>{option.label}/s</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={{ offset: '3', span: '3' }}>
            <Form.Group className="mb-3" controlId="downloadSize">
              <Form.Label>Total Size:</Form.Label>
              <Form.Control value={totalSize} onChange={e => setTotalSize(e.target.value)} />
            </Form.Group>
          </Col>
          <Col sm="3">
            <Form.Group className="mb-3" controlId="downloadSizeUnits">
              <Form.Label>Units:</Form.Label>
              <Form.Select value={totalSizeUnits} onChange={(e: any) => setTotalSizeUnits(e.target.value as unknown as Unit)}>
                {downloadUnits.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center mt-2">
            It will take {getTImeToDownload(downloadRate, downloadRateUnits, totalSize, totalSizeUnits)} to download
            {' '} {totalSize} {downloadUnits.find(du => du.value === totalSizeUnits)?.label}
            {' '} at {downloadRate} {downloadUnits.find(du => du.value === downloadRateUnits)?.label}/s
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
