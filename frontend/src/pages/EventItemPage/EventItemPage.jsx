import React, { useEffect, useState } from 'react'
import cl from './EventItemPage.module.scss'
import Tag from '../../shared/modules/Tag/Tag'
import { useParams } from 'react-router-dom';
import fake from '../../fake/fakeData';
import BtnGreen from '../../shared/modules/BtnGreen/BtnGreen';
import FeedbackItem from '../../widgets/FeedbackItem/FeedbackItem';
import heart from '../../shared/assets/heart.svg'
import money from '../../shared/assets/point.svg'

function EventItemPage() {

    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [isPushNotificationChecked, setIsPushNotificationChecked] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const response = fake.getEvents();
        setItem(response.find(event => event.id === Number(id)));
    }, [id])

    
    console.log(item);
    const {title, image, date, address, tags, point, organization, description, feedbacks} = item;

    const toggleFavorite = () => {
        setIsFavorite(prevState => !prevState);
    }

    const handleCheckboxChange = (e) => {
        setIsPushNotificationChecked(e.target.checked);
        console.log('Push notifications checked:', e.target.checked);
    };

  return (
    <div className={cl.eventItemPage}>
        {   
            !item
            ? <div>Событие не найдено!</div>
            :
            <div className={cl.eventItemPage__wrapper}>
                <div className={cl.eventItemPage__image}>
                    <img className={cl.eventItemPageImage} src={image} alt={title} />
                    <div 
                        className={`${cl.eventItemImage__like} ${isFavorite ? cl.active : ' '}`}
                        onClick={toggleFavorite}
                    >
                        <img src={heart} alt="favorite btn" />
                    </div>
                    <div className={cl.eventItemImage__point}>
                        {point}
                        <img src={money} alt="point icon" />
                    </div>
                </div>
                <div className={cl.eventItemPage__content}>
                    <div className={cl.content__top}>
                        <h2 className={cl.top__title}>{title}</h2>
                        <div className={cl.top__tags}>
                            {
                                tags && tags.map((tag, index) => (
                                    <Tag key={index}>{tag}</Tag>
                                ))
                            }
                        </div>
                        <div className={cl.top__info}>
                            <div className={cl.info__date}>{date}</div>
                            <div className={cl.info__address}>{address}</div>
                        </div>       
                    </div>
                    <div className={cl.content__info}>
                        <div className={cl.info__organization}>
                            <h5 className={cl.info__title}>Организатор</h5>
                            <div className={cl.info__subtitle}>{organization}</div>
                        </div>
                        <div className={cl.info__description}>
                            <h5 className={cl.info__title}>Описание</h5>
                            <div className={cl.info__subtitle}>{description}</div>
                            <div className={cl.pushNotification}>
                                <input
                                className={cl.pushNotification__checkbox}
                                type="checkbox"
                                checked={isPushNotificationChecked}
                                onChange={handleCheckboxChange}
                                id="push_email"
                                name="push_email"
                                />
                                <label htmlFor="push_email">Присылать напоминание за день до мероприятия</label>
                            </div>
                            <div className={cl.entryEvent}>
                                <BtnGreen width="339px">Записаться на мероприятие</BtnGreen>
                            </div>
                        </div>
                    </div>
                    <div className={cl.content__feedback}>
                        <div className={cl.info__title}>Отзывы</div>
                        <div className={cl.feedback__items}>
                            {
                                feedbacks && feedbacks.map((feedback, index) => (
                                    <FeedbackItem feedback={feedback} key={index}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default EventItemPage