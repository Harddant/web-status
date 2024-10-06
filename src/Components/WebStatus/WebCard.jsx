import './WebStatus.css' 

export const WebCard = ({website}) => {

    return (
        <div className='card-container'>
            <p className='webname'>{website.name}</p>
            <div className="iframe-div">
                <iframe frameborder="0" scrolling="no" src={website.url}/>
            </div>
            <p className="status">
                Status: <span className={website.status ? 'up' : 'down'}>
                    {website.status ? 'Up' : 'Down'}
                </span>
            </p>
        </div>
    );
};

