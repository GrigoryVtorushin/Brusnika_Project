import React, {useState} from 'react';
import background from '../images/Ekaterinburg.png'
import LandItemList from "../Components/LandItemList";
import {Button, Form, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useAds} from "../Store/store";
import Filters from "../Components/Filters";

const MainPage = ({isLoading, isError} : any) => {

    const totalItems = useAds(state => state.totalItems);
    const {setSort, setDesc, setSearch} = useAds();
    const [showFilters, setShowFilters] = useState(false);
    return (
        <>
            <div style={{backgroundImage: `url(${background})`,
                height:'328px',
                backgroundPosition: "center",
                backgroundRepeat:"no-repeat" ,
                backgroundSize: "auto"}}
            >
                <div style={{maxWidth: "1000px", margin: "0 auto", paddingTop: "156px"}}>
                    <h1 style={{color: "white", marginBottom: "30px", fontWeight: "600"}}>Продажа земельных участков</h1>
                    <div className="input-group">
                        <input type="text"
                               className="form-control"
                               placeholder="Поиск"
                               aria-label="Поиск"
                               aria-describedby="input-group-button-right"
                               onChange={event => setTimeout(() => setSearch(event.target.value), 1000)}
                        />
                        <Button variant={"light"} onClick={() => setShowFilters(true)}>Фильтры</Button>
                    </div>
                </div>
            </div>
            <div style={{margin:"72px 70px"}}>
                <h2 style={{fontWeight:"600"}}>Все предложения</h2>
                <div className={"d-flex "}>
                    Найдено {totalItems} объявлений
                    {/*<div style={{color: "#1565C0", marginLeft:"20px"}}>*/}
                    {/*    <img src={require("../images/sortIcon.png")} alt={''}/>*/}
                    {/*    Сортировка*/}
                    {/*</div>*/}
                    <Form.Select onChange={event => {
                        let value = event.target.value;
                        console.log(value);
                        if (value ==="price_up") {
                            // setSorted({sorted: value, reversed: false});
                            // setAds(sortByPrice(allAds));
                            setSort('price');
                            setDesc(true);
                        }
                        if (value ==="price_down") {
                            setSort('price');
                            setDesc(false);
                        }
                        if (value ==="area_down") {
                            setSort('area');
                            setDesc(false);
                        }
                        if (value ==="area_up") {
                            setSort('area');
                            setDesc(true);
                        }
                        if (value === 'default') {
                            setSort('time')
                            setDesc(true)
                        }

                    }} style={{maxWidth: 200, marginLeft:"20px"}} aria-label="Default select example">
                        {/*<option value='time_up'>По дате публикации(Новые)</option>*/}
                        {/*<option value='time_down'>По дате публикации(Старые)</option>*/}
                        <option value='default'>По умолчанию</option>
                        <option value="price_down">Сначала дешевле</option>
                        <option value="price_up">Сначала дороже</option>
                        <option value="area_down">По возрастанию площади</option>
                        <option value="area_up">По убыванию площади</option>
                    </Form.Select>
                    <Link to={'/map'}>
                        <div style={{color: "#1565C0", marginLeft:"20px"}}>
                            <img style={{marginRight: "5px"}} src={require("../images/onMap.png")} alt={''}/>
                            На карте
                        </div>
                    </Link>

                </div>
            </div>
            <div>
                {isLoading && <div style={{display: "flex", justifyContent: "center"}}><Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner></div>}
                {!isLoading && !isError && <LandItemList/>}
                {isError && <div>Произошла ошибка загрузки данных.</div>}
            </div>
            <Filters show={showFilters} setShow={setShowFilters} />
        </>
    );
};

export default MainPage;