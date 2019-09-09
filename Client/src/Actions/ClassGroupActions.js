/**
 * ClassGroup Action
 * @author : JoongHo
 */

 import { ActionTypes } from '../utils/ActionTypeList';

const RegisterClassGroup = (className, startDate, endDate, subject, branchCode) => {
    return ({
        type: ActionTypes.REGISTER_CLASSGROUP,
        payload:{
            request:{
                method: 'POST',
                url: `/manage/class/new`,
                headers: {
                    'Content-Type': 'application/json; charset: utf-8'
                }, // 생성에 필요한 모든 값을 JSON > key : value로 보낸다 : postman 실행 창과 비슷
                data: JSON.stringify({
                    className : className,
                    classStartDate : startDate,
                    classEndDate : endDate,
                    subject : subject,
                    branch : {
                        branchCode : branchCode
                    }})
            }
        }
    });
};


export const ClassGroupActions ={
    RegisterClassGroup
}
