export const useFillterQuestion = () => {

    const fillterQuestionMain = (questionData:any, LevelData:any[], TopicData:any[], selectIndexLevel:number , selectIndexStatus:number, selectIndexTopic:number) => {
        if (selectIndexLevel != 0 && selectIndexStatus != 0 && selectIndexTopic != 0) {

            let list_data = Object.values(questionData).filter((data: any) => {
              if (selectIndexStatus == 1) return data.level_id == LevelData[selectIndexLevel - 1].id && data.topic_id == TopicData[selectIndexTopic - 1].id && data.submit_count == 0
              else if (selectIndexStatus == 2) return data.level_id == LevelData[selectIndexLevel - 1].id && data.topic_id == TopicData[selectIndexTopic - 1].id && data.submit_count > 0 && data.summit_success_count == 0
              else if (selectIndexStatus == 3) return data.level_id == LevelData[selectIndexLevel - 1].id && data.topic_id == TopicData[selectIndexTopic - 1].id && data.summit_success_count > 0
            })
            return list_data
        
        } else if (selectIndexLevel != 0 && selectIndexStatus != 0) {
        
            let list_data = Object.values(questionData).filter((data: any) => {
              if (selectIndexStatus == 1) return data.level_id == LevelData[selectIndexLevel - 1].id && data.submit_count == 0
              else if (selectIndexStatus == 2) return data.level_id == LevelData[selectIndexLevel - 1].id && data.submit_count > 0 && data.summit_success_count == 0
              else if (selectIndexStatus == 3) return data.level_id == LevelData[selectIndexLevel - 1].id && data.summit_success_count > 0
            })
            return list_data
        
        } else if (selectIndexLevel != 0 && selectIndexTopic != 0) {
        
            let list_data = Object.values(questionData).filter((data: any) => {
              return data.level_id == LevelData[selectIndexLevel - 1].id && data.topic_id == TopicData[selectIndexTopic - 1].id
            })
            return list_data
        
        } else if (selectIndexStatus != 0 && selectIndexTopic != 0) {
        
            let list_data = Object.values(questionData).filter((data: any) => {
              if (selectIndexStatus == 1) return data.topic_id == TopicData[selectIndexTopic - 1].id && data.submit_count == 0
              else if (selectIndexStatus == 2) return data.topic_id == TopicData[selectIndexTopic - 1].id && data.submit_count > 0 && data.summit_success_count == 0
              else if (selectIndexStatus == 3) return data.topic_id == TopicData[selectIndexTopic - 1].id && data.summit_success_count > 0
            })
            return list_data
        
        } else if (selectIndexLevel != 0) {
        
            let list_data = Object.values(questionData).filter((data: any) => {
              return data.level_id == LevelData[selectIndexLevel - 1].id
            })
            return list_data
        
        } else if (selectIndexStatus != 0) {
        
        
            let list_data = Object.values(questionData).filter((data: any) => {
              if (selectIndexStatus == 1) return data.submit_count == 0
              else if (selectIndexStatus == 2) return data.submit_count > 0 && data.summit_success_count == 0
              else if (selectIndexStatus == 3) return data.summit_success_count > 0
            })
            return list_data
        
        } else if (selectIndexTopic != 0) {
            let list_data = Object.values(questionData).filter((data: any) => {
              return data.topic_id == TopicData[selectIndexTopic - 1].id
            })
            return list_data
        } else {
            return questionData
        }
    }


    const fitterQuestionDashboard = async (questionData:any, LevelData:any[], TopicData:any[], selectIndexLevel:number , selectIndexTopic:number) => {
        if (selectIndexLevel != 0 && selectIndexTopic != 0) {
      
          let list_data = Object.values(questionData).filter((data:any) => {
            return data.level_id == LevelData[selectIndexLevel - 1].id && data.topic_id == TopicData[selectIndexTopic - 1].id
          })
      
          return list_data
      
        } else if (selectIndexLevel != 0 && selectIndexTopic != 0) {
      
          let list_data = Object.values(questionData).filter((data:any) => {
            return data.level_id == LevelData[selectIndexLevel - 1].id && data.topic_id == TopicData[selectIndexTopic - 1].id
          })
      
          return list_data
      
        } else if (selectIndexTopic != 0) {
      
          let list_data = Object.values(questionData).filter((data:any) => {
            return data.status == data.topic_id == TopicData[selectIndexTopic - 1].id
          })
          return list_data
      
        } else if (selectIndexLevel != 0) {
      
          console.log(questionData)
      
          let list_data = Object.values(questionData).filter((data:any) => {
            return data.level_id == LevelData[selectIndexLevel - 1].id
          })
          return list_data
      
        }
       else {
          return questionData
        }
      }

    return {
        fillterQuestionMain,
        fitterQuestionDashboard
    }
}
