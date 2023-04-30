// import {AiOutlineLike,AiFillLike,AiFillDislike,AiOutlineDislike} from 'react-icons/ai'
 //  const [likeCount,setLikeCount]=useState(response1.product.likedCount)
  //  const [disLikeCount,setDisLikeCount]=useState(response1.product.disLikedCount)
  //  const [like,setLike]=useState(response1.like)
  //  const [dislike,setDisLike]=useState(response1.dislike)

  //    const addorLowerLike=()=>{
//     if(!like){
//         setLikeCount(likeCount+1)
//     }else{
//         setLikeCount(likeCount-1)
//     }
// }
//     const addorLowerDisLike=()=>{
//         if(!dislike){
//             setDisLikeCount(disLikeCount+1)
//         }else{
//             setDisLikeCount(disLikeCount-1)
//         }
//     }
  //   const handleLike=async()=>{
  //     setLike(!like)
  //     addorLowerLike()
  //     if(dislike){
  //       setDisLike(!dislike)
  //       addorLowerDisLike()
  //     }
  //     console.log("like action is being called") 
  //     const apiUrl=`http://localhost:3500/users/${username}/${barcode}/like`
  //     await axios.post(apiUrl,{"username":username},{
  //         headers: {
  //           'Authorization': 'Bearer ' + access_token
  //         }
  //       })
  //       return 0;
  //  }
  //  const handleDislike=async()=>{
  //     addorLowerDisLike()
  //     setDisLike(!dislike)
  //     if(like){
  //       setLike(!like)
  //       addorLowerLike()
  //     }
  //     console.log("dislike action is being called")
  //     const apiUrl=`http://localhost:3500/users/${username}/${barcode}/dislike`
  //     await axios.post(apiUrl,{"username":username},{
  //         headers: {
  //           'Authorization': 'Bearer ' + access_token
  //         }
  //       })
  //     return 0
  //  }

{/* {like===false? <button onClick={handleLike} ><span>{likeCount}</span><AiOutlineLike/></button>
    : <button onClick={handleLike}><span>{likeCount}</span><AiFillLike/></button>}
{dislike===false? <button onClick={handleDislike}><span>{disLikeCount}</span><AiOutlineDislike/></button>
    : <button onClick={handleDislike}><span>{disLikeCount}</span><AiFillDislike/></button>} */}