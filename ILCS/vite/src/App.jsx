import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import axios from "axios";
function App() {
  const [count, setCount] = useState(0);
  const [vnegara, setinputnegara] = useState("");
  const [vpelabuhan, setvpelabuhan] = useState("");
  const [cdnegara, setcdnegara] = useState("");
  const [cdbarang, setcdbarang] = useState("");
  const [tarif, settarif] = useState("");
  const [cdhbarang, setcdhbarang] = useState("");

  const handlenegara = (event) => {
    const value = event.target.value;
    setinputnegara(value);

    //insw-dev.ilcs.co.id/n/pelabuhan?kd_negara=SG&ur_pelabuhan=jur
    if (value.length >= 3) {
      axios
        .get(`https://insw-dev.ilcs.co.id/n/negara?ur_negara=${value}`)
        .then((response) => {
          // Handle successful response
          console.log(response.data);
          setinputnegara(response.data.data[0].ur_negara);
          setcdnegara(response.data.data[0].kd_negara);
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    }
  };

  const handlepelabuhan = (event) => {
    const value = event.target.value;
    setvpelabuhan(value);

    //insw-dev.ilcs.co.id/n/barang?hs_code=
    https: axios
      .get(
        `https://insw-dev.ilcs.co.id/n/pelabuhan?kd_negara=${cdnegara}&ur_pelabuhan=${value}`
      )
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        setvpelabuhan(response.data.data[0].ur_pelabuhan);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const handlebarang = (event) => {
    const value = event.target.value;
    setcdbarang(value);

    axios
      .get(`https://insw-dev.ilcs.co.id/n/barang?hs_code=${value}`)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        setcdhbarang(response.data.data[0].sub_header);
      })
      .get(`https://insw-dev.ilcs.co.id/n/tarif?hs_code=${value}`)
      .then((response) => {
        // Handle successful response
        console.log(response.data, "tarif");
        // settarif(response.data.data[0].sub_header);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Negara</Form.Label>
          <Form.Control
            type="text"
            value={vnegara}
            onChange={handlenegara}
            placeholder="Negara"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Pelabuhan</Form.Label>
          <Form.Control
            type="text"
            placeholder="Pelabuhan"
            value={vpelabuhan}
            onChange={handlepelabuhan}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Barang</Form.Label>
          {/* input manual id */}
          <Form.Control
            type="text"
            placeholder="Barang"
            onChange={handlebarang}
            value={cdbarang}
          />
          {/* otomatis  */}
          <Form.Control
            type="text"
            placeholder="nama barang"
            value={cdhbarang}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Harga</Form.Label>
          <Form.Control type="number" placeholder="Harga" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Tarif Bea masuk</Form.Label>
          {/* dari insw */}
          <Form.Control type="text" value={tarif} placeholder="persen" />
          {/* harga tarif bm dari harga * tarif persen */}
          <Form.Control type="text" placeholder="Pelabuhan" />
        </Form.Group>
      </Form>
    </>
  );
}

export default App;
