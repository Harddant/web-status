import './WebStatus.css';
import React from 'react';

export const WebCard = ({website}) => {

    const visitSite = (url) => {
        window.open(url, '_blank').focus();
    }
    
    return (
        <div onClick={() => visitSite(website.url)} className='card-container'>
            <p className='webname'>{website.name}</p>
            <div className="iframe-div">
                {website.status ? (
                    <iframe frameBorder="0" scrolling="no" src={website.url} title={website.name}/>
                ) : (
                    <p>Website is currently down</p>
                )}
            </div>
            <p className="status">
                Status: <span className={website.status ? 'up' : 'down'}>
                    {website.status ? 'Up' : 'Down'}
                </span>
            </p>
            <p className="uptime">
                Uptime: <span className={website.status ? 'up' : 'down'}>
                    {website.status ? website.uptime : '---' }
                </span>
            </p>
        </div>
    );
};
