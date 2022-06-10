//
//  LetterManager.swift
//  TimeMachineLetter
//
//  Created by Dean on 2022/06/10.
//

import UIKit
import Alamofire
import KakaoSDKAuth

protocol LetterManagerDelegate {
    func didPostSuccess()
    func didFailWithError(error: Error)
}

struct LetterManager {
    var delegate: LetterManagerDelegate?
    
    func postLetter(with letterModel: LetterModel) {
        AF.request("http://timemachineletter.tk:8080/letter", method: .post, parameters: letterModel, encoder: JSONParameterEncoder.default).validate().responseData { response in
            debugPrint(response)
            switch response.result {
            case .success, .failure(Alamofire.AFError.responseSerializationFailed(reason: Alamofire.AFError.ResponseSerializationFailureReason.inputDataNilOrZeroLength)):
                print("Validation Successful")
                self.delegate?.didPostSuccess()
            case let .failure(error):
                self.delegate?.didFailWithError(error: error)
            }
        }
    }
    
    
    func getTime(_ date: Date) -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZ"
        let strDate = dateFormatter.string(from: date)
        
        return strDate
    }
}
