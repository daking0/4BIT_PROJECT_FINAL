/**
 * PAGENATION
 * @author: 황서영
 * 
 * @description: 
 * 리스트 페이지에 PAGE 가져갈 컴포넌트
 * 
 * */

 import React from 'react';

 // reactstrap components
import {
    Pagination,
    PaginationItem,
    PaginationLink
  } from "reactstrap";



 class PaginationComponent extends React.Component{ 
    
    constructor(props){
        super(props);
     }



     render(){
         const {baseUrl, page, size, totalCount } = this.props;

        const totalPage = parseInt(((totalCount) + (size -1)) / (size));
        const startPage = parseInt((page / size)) *parseInt((size))+1;
        const endPage = parseInt(Math.min(((parseInt(page/size)+1)*(size)), totalPage));

        const pageNo = [];
        for(var i= startPage; i <= endPage; i++){
            pageNo[i] = i;
        }

         return(
            <Pagination>
                {/* 처음페이지 >> startPage*/}

                        <PaginationItem>
                            <PaginationLink
                            href ={`${baseUrl}/${startPage}`}
                            >
                            <span aria-hidden={true}>
                                <i
                                aria-hidden={true}
                                className="fa fa-angle-double-left"
                                />
                            </span>
                            </PaginationLink>
                        </PaginationItem>

                {/* endPage 까지 숫자 반복 >> 선택 페이지 활성화 찾아봐야함*/}

                {
                  pageNo.map((page, index)=> {
                      return(
                       <PaginationItem key = {index}>
                        <PaginationLink
                          href ={`${baseUrl}/${page}`}
                         >
                          {page}
                         </PaginationLink>
                        </PaginationItem>
                      );

                     })
                 }

                {/* 마지막페이지 endPage*/}
                    <PaginationItem>
                         <PaginationLink
                         href ={`${baseUrl}/${endPage}`}
                        >
                          <span aria-hidden={true}>
                            <i
                              aria-hidden={true}
                              className="fa fa-angle-double-right"
                            />
                          </span>
                        </PaginationLink>
                      </PaginationItem>

                </Pagination>
         );
     }


 }

 export default PaginationComponent;