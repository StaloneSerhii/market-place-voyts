const BuyProduct = () => {
    return (
        <div>
            <div>
                <div><img src="/" alt="/" />
                    <form>
                        <label htmlFor="">
                            <h3>Знайдемо потрібну запчастину</h3>
                            <input type="text" placeholder="Номер або назва запчастини" />
                        </label>
                        <label htmlFor=""><input type="tel" placeholder="Телефон" /></label>
                        <button>Надіслати запит</button>
                    </form>
                </div>
            </div>
            <div>
                <div>
                    <h3>Назва запчастини... хрестовина з головками 4324-234-324 бла бла бла</h3>
                    <div>
                        <p>Код: <span>123132</span></p>
                        <p>Артикул: <span>cr234</span></p>
                        <p>Виробник: <span>Della Concerda</span></p>
                        <span>Наявність</span>
                        <span>3999.00 грн</span>
                        <button>Купити</button>
                    </div>
                    <div>
                        <p>Отримати консультацію</p>
                        <span>+38(67)000-00-00</span>
                        <button>Задати питання</button>
                    </div>
                </div>
                <div>
                    <h4>Аналони</h4>
                    <div>
                        <img src="/" alt="/" />
                        <p>2313123</p>
                        <p>Назва запчастини... хрестовина з головками 4324</p>
                    </div>
                </div>
                <button>Опис</button>
                <button>Застосування</button>
                <button>ОБМ номер</button>
            </div>
        </div>
    )
}

export default BuyProduct