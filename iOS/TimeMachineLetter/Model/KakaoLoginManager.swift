//
//  KakaoLogin.swift
//  TimeMachineLetter
//
//  Created by Dean on 2022/06/07.
//

import UIKit
import Alamofire
import KakaoSDKAuth

protocol KaKaoLoginManagerDelegate {
    func didLoginSuccess()
    func didFailWithError(error: Error)
}

struct KakaoLoginManager {
    
    var delegate: KaKaoLoginManagerDelegate?
    
    func loginWithToken(oauthToken: OAuthToken?, error: Error?) {

        if let error = error {
            print(error)
        } else {
            print("로그인 성공")
            
            if let token = oauthToken?.accessToken {
                print(token)
                fetchLoginData(token)
            }
        }
    }
    
    func fetchLoginData(_ token: String) {

        print("fetch start")
        
        var request = URLRequest(url: URL(string: "http://timemachineletter.tk:8080/user/token-login")!)
        request.httpMethod = HTTPMethod.post.rawValue
        request.httpBody = token.data(using: .utf8)

        AF.request(request).validate().responseData { response in
            debugPrint(response)
            switch response.result {
            case .success:
                print("Validation Successful")
                self.delegate?.didLoginSuccess()
            case let .failure(error):
                self.delegate?.didFailWithError(error: error)
            }
        }
    }
}
