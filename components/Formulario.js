import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import axios from 'axios';

const Formulario = ({ moneda, setLabelCripto, criptomoneda, setMoneda, setCriptomoneda, setConsultarApi }) => {

    const [criptomonedas, setCriptomonedas] = useState([]);
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            setCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    // almacena la moneda seleccionada
    const obtenerMoneda = moneda => {
        setMoneda(moneda);
    }
    // almacena  la criptomoneda seleccionada
    const obtenerCriptoMoneda = value => {
        setCriptomoneda(value);
    }

    // cotizar precio
    const cotizarPrecio = () => {
        if (moneda.trim() === '' || criptomoneda.trim() === '') {
            mostrarAlerta();
            return;
        }
        // pasa la validacion
        // console.log('cotizando');
        // Obtener el nombre completo de la criptomoneda, 3000 por el spinner
        setTimeout(() => {
            criptomonedas.map(cripto => {
                if (cripto.CoinInfo.Name === criptomoneda) {
                    setLabelCripto(cripto.CoinInfo.FullName);
                }
            });
        }, 3000);
        setConsultarApi(true);
    }
    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios, Por favor selecciónelos.',
            [
                { text: 'Ok' }
            ]
        )
    }
    return (
        <View>

            <Text style={styles.label}>Moneda</Text>

            <Picker
                selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
                itemStyle={{ height: 120 }}            >
                <Picker.Item label="- Seleccione -" value="" />
                <Picker.Item label="Guarani - PYG" value="PYG" />
                <Picker.Item label="Dolar de Estados Unidos - USD" value="USD" />
                <Picker.Item label="Peso Mexicano - MXN" value="MXN" />
                <Picker.Item label="Euro - EUR" value="EUR" />
                <Picker.Item label="Libra Esterlina - GBP" value="GBP" />
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>

            <Picker
                selectedValue={criptomoneda}
                onValueChange={value => obtenerCriptoMoneda(value)}
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="- Seleccione -" value="" />

                {criptomonedas.map(cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ))}
            </Picker>
            <View>
                <TouchableHighlight
                    onPress={() => cotizarPrecio()}
                    style={styles.cotizar}
                >
                    <Text style={styles.textoCotizar}>Cotizar</Text>
                </TouchableHighlight>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    },
    cotizar: {
        backgroundColor: '#5e49e2',
        padding: 10,
        marginTop: 20,
        borderRadius: 7
    },
    textoCotizar: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase'
    }
})
export default Formulario;