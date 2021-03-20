import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Cotizacion = ({ resultado, labelCripto}) => {

    if (Object.keys(resultado).length === 0) return null;

    return (
        <>
            <View style={styles.resultado}>
                <Text style={styles.texto}>El Precio del {labelCripto} es:{' '}
                    <Text style={[styles.span, styles.precio]}>{resultado.PRICE}</Text>
                </Text>
                <Text style={styles.texto}>El precio más alto del día: {' '}
                    <Text style={styles.span}>{resultado.HIGHDAY}</Text>
                </Text>
                <Text style={styles.texto}>El precio más bajo del día: {' '}
                    <Text style={styles.span}>{resultado.LOWDAY}</Text>
                </Text>
                <Text style={styles.texto}>Variación en las últimas 24 horas: {' '}
                    <Text style={styles.span}>{resultado.CHANGEPCT24HOUR} %</Text>
                </Text>
                <Text style={styles.texto}>Última actualización: {' '}
                    <Text style={styles.span}>{resultado.LASTUPDATE}</Text>
                </Text>
            </View>
        </>

    );
}
const styles = StyleSheet.create({
    resultado: {
        backgroundColor: '#5e49e2',
        padding: 10,
    },
    texto: {
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        marginBottom: 10
    },
    precio: {
        fontSize: 24
    },
    span: {
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textAlign: 'center'
    }
})
export default Cotizacion;



