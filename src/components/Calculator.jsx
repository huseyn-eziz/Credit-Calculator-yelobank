import React, { useState } from 'react'

const Calculator = () => {

    const [kreditDeyerleri, setKreditdeyerleri] = useState({
        mebleg: '',
        faiz: '',
        ay: '',
    });

    const [netice, setNetice] = useState({
        ayliqOdenis: '',
        umumiOdenis: '',
        cemFaiz: '',
        // isResult: false,
    });

    const handleSliderChange = (e, inputName) => {
        const scrolledValue = e.target.value;
        setKreditdeyerleri({ ...kreditDeyerleri, [inputName]: scrolledValue });
        neticehesabla({ ...kreditDeyerleri, [inputName]: scrolledValue });
    };

    const handleInputChange = (e) => {
        setKreditdeyerleri({ ...kreditDeyerleri, [e.target.name]: e.target.value });

        neticehesabla({ ...kreditDeyerleri, [e.target.name]: e.target.value });
    }

    // const handleSubmitValues = (e) => {
    //     e.preventDefault();
    //     neticehesabla(kreditDeyerleri);
    // };

    const neticehesabla = ({ mebleg, faiz, ay }) => {
        const userinYazdigiDeyer = Number(mebleg);
        const faizHesabla = Number(faiz) / 100 / 12;
        const ayHesabla = Number(ay);
        const x = Math.pow(1 + faizHesabla, ayHesabla);
        const ayliq = (userinYazdigiDeyer * x * faizHesabla) / (x - 1);

        if (isFinite(ayliq)) {
            const ayliqHesab = ayliq.toFixed(2);
            const umumiHesab = (ayliq * ayHesabla).toFixed(2);
            const umumiFaizHesab = (ayliq * ayHesabla - userinYazdigiDeyer).toFixed(2);

            setNetice({
                ayliqOdenis: ayliqHesab,
                umumiOdenis: umumiHesab,
                cemFaiz: umumiFaizHesab,
                // isResult: true,
            });
        }
        return;
    };

    return (
        <div className='row'>
            <h1 className='w-75 mx-auto  mb-5 text-center border mt-5 text-white-50 '>Bank Calculator</h1>
            <div className='col-6 border'>

                <h4 className='mt-5 mb-4 w-75 m-auto '>
                    Kredit sifaris et:
                </h4>
                {/* <form onSubmit={handleSubmitValues}> */}

                <div className='form-items w-75 m-auto  '>
                    <div className='inputs '>
                        <label id='label'>Kredit məbləği:</label>
                        <input
                            type='text'
                            name='mebleg'
                            placeholder='Kredit məbləği'
                            value={kreditDeyerleri.mebleg}
                            onChange={handleInputChange}
                            style={{backgroundColor: 'gray' }}
                        />
                        <input className='scroll'
                            type='range'
                            name='mebleg'
                            min='0'
                            max='10000'
                            step='100'
                            value={kreditDeyerleri.mebleg}
                            onChange={(e) => handleSliderChange(e, 'mebleg')}
                            style={{ height: '40px', width: '100%' }}
                        />

                    </div>
                    <div className="row">
                        <div className='input col-6'>
                            <label id='label'>Faiz dərəcəsi:</label>
                            <input
                                type='text'
                                name='faiz'
                                placeholder='Faiz'
                                value={kreditDeyerleri.faiz}
                                onChange={handleInputChange}
                                style={{backgroundColor: 'gray' }}
                            />
                            <input className='scroll'
                                type='range'
                                name='faiz'
                                min='0'
                                max='20'
                                step='1'
                                value={kreditDeyerleri.faiz}
                                onChange={(e) => handleSliderChange(e, 'faiz')}
                                style={{ height: '40px', width: '100%' }}
                            />
                        </div>
                        <div className='input col-6'>
                            <label id='label'>Kredit müddəti:</label>
                            <input
                                type='text'
                                name='ay'
                                placeholder='Ay'
                                value={kreditDeyerleri.ay}
                                onChange={handleInputChange}
                                style={{backgroundColor: 'gray' }}
                            />
                            <input className='scroll'
                                type='range'
                                name='ay'
                                min='0'
                                max='24'
                                step='1'
                                value={kreditDeyerleri.ay}
                                onChange={(e) => handleSliderChange(e, 'ay')}
                                style={{ height: '40px', width: '100%' }}
                            />

                        </div>
                    </div>
                    {/* <input type='submit' className='button' placeholder='Hesabla' /> */}
                </div>
                {/* </form> */}
            </div>
            <div className='col-6 border '>
                <div className=' w-80 border '>
                <h4 className='mb-5'>
                    Hesablanan Kredit:
                </h4>
                <div className=" row justify-content-center">
                <div className='border w-50 text-center   '>
                    <label>Aylıq ödəniş:</label>
                    <h2>{netice.ayliqOdenis !==  '' ? netice.ayliqOdenis + ' AZN': '-----'}</h2>
                </div>
                </div>
                <div className="row mt-5 justify-content-center ">
                    <div className='input col-5 border text-center text-white-50  '>
                        <label>Ümumi ödəniləcək məbləğ: </label>
                        <h2>{netice.umumiOdenis !==  '' ? netice.umumiOdenis + ' AZN': '-----'}</h2>
                    </div>
                    <div className='input col-5 border text-center text-white-50  '>
                        <label>Odəniləcək faiz meblegi:</label>
                        <h2>{netice.cemFaiz !==  '' ? netice.cemFaiz + ' AZN' : '-----'}</h2>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator;