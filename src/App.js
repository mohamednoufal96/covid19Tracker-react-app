import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core";
import { useEffect, useState } from "react";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import "./App.css";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            });
    }, []);

    useEffect(() => {
        const getCountries = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    setTableData(data);
                    setCountries(countries);
                });
        };
        getCountries();
    }, []);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        const url =
            countryCode === "worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                setCountry(countryCode);
                setCountryInfo(data);
            });
    };

    console.log("country info >> ", countryInfo);

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1>COVID-19 TRACKER</h1>
                    <FormControl className="app__dropdown">
                        <Select variant="outlined" value={country} onChange={onCountryChange}>
                            <MenuItem value="worldwide"> Worldwide</MenuItem>
                            {countries.map((country, index) => {
                                return (
                                    <MenuItem key={index} value={country.value}>
                                        {country.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className="app__stats">
                    <InfoBox title="Covid-19 cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
                    <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
                    <InfoBox title="Death" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
                </div>

                <Map />
            </div>
            <Card className="app__right">
                <CardContent>
                    <h2>Live cases by country</h2>
                    <Table countries={tableData} />
                    <h2>Worldwide new cases</h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
