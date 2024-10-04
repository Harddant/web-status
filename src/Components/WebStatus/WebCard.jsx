import './WebStatus.css' 

export const WebCard = ({website}) => {

    return (
        <div className='card-container'>
            <p className='webname'>{website.name}</p>
            <iframe scrolling="no" className='iframe' src={website.url}></iframe>
        </div>
    );
};

