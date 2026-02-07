import PlusIcon from "../../icons/PlusIcon"
import { ShareIcon } from "../../icons/ShareIcon"

interface cardProps {
    link: string,
    title: string,
    type: "twitter" | "youtube"
}
const defaultCardStyle =
  "p-8  bg-white border-gray-200 border mt-10 ";


const renderVideo = (link: string, type: "youtube" | "twitter") => {
    return type === "twitter"
        ? <blockquote className="twitter-tweet">
            <a className=" max-h-50" href={link.replace("x.com", "twitter.com")}></a>
        </blockquote>
        :
        <iframe className="w-full" src={link.replace("watch", "embed")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
}


// const renderVideo ={
//     twitter:  <blockquote className="twitter-tweet">
//   {link.replace("x.com","twitter.com")}
// </blockquote>  ,
//     youtube :  <iframe className="w-full" src={link.replace("watch","embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
// }
const Card = ({ link, title, type }: cardProps) => {
    return <div className={`${defaultCardStyle} rounded-sm`}>

        <div className="flex justify-between items-center ">

            <div className="flex items-center text-md ">
                <div className="text-gray-500 pr-3">
                    <PlusIcon></PlusIcon>
                </div>
                {title}
            </div>

            <div className="flex  items-center  text-gray-500">
                {/*  hyperlink for opening in new tab */}
                <div className="pr-3">  
                    <a href={link} target="_blank">
                        <ShareIcon></ShareIcon>
                    </a>
                </div>

                <div className="pr-3">
                    <ShareIcon></ShareIcon>
                </div>

            </div>


        </div>

        <div className="p-4 rounded-md">


            {renderVideo(link, type)}

        </div>

    </div>

}

export default Card



/*
" " -- only string

 single object { } -- only this

{variantClasses[variants] + " " + defaultStyles} - adding mutiple variables
or 
{` ${variantClasses[variants]}  ${defaultStyles} `}

when combine both string and ${}

  {`${defaultStyles}  plain ` } 
*/