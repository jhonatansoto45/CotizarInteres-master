import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import Form from "./src/components/Form";
import Footer from './src/components/Footer';
import ResultCalcular from './src/components/ResultCalcular';

import colors from "./src/utils/colors";


export default function App() {
  const [capital, setCapital] = useState(null);
  const [interes, setInteres] = useState(null);
  const [meses, setMeses] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (capital && interes && meses) calcular();
    else reset();
  }, [capital, interes, meses])


  const calcular = () => {
    reset();
    if (!capital) {
      setErrorMessage("Añade la cantidad");
    }
    else if (!interes) {
      setErrorMessage("Añade el interes");
    }
    else if (!meses) {
      setErrorMessage("Añade los meses");
    }
    else {
      const i = interes / 100;
      const fee = capital / ((1 - Math.pow(i + 1, - meses)) / i);
      setTotal({
        //toFixed SIRVE PARA MOSTRAR LOS DECIMALES DESPUES DEL punto .
        mesfee: fee.toFixed(2).replace('.', ','),
        totalPagable: (fee * meses).toFixed(2).replace('.', ',')
      })
    }
  }

  const reset = () => {
    setErrorMessage("");
    setTotal(null);
  }


  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background}></View>
        <Text style={styles.titulo}>Cotizador de Prestamos</Text>
        <Form
          setCapital={setCapital}
          setInteres={setInteres}
          setMeses={setMeses} />
      </SafeAreaView>
      <ResultCalcular
        capital={capital}
        interes={interes}
        meses={meses}
        total={total}
        errorMessage={errorMessage} />
      <Footer calcular={calcular} />
    </>
  );

};


const styles = StyleSheet.create({
  safeArea: {
    height: 290,
    alignItems: 'center',
  },
  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  }
});