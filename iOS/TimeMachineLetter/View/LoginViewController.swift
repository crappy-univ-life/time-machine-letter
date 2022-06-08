//
//  LoginViewController.swift
//  TimeMachineLetter
//
//  Created by Dean on 2022/05/22.
//

import UIKit
import Alamofire
import KakaoSDKAuth
import KakaoSDKUser

class LoginViewController: UIViewController {

    var kakaoLoginManager = KakaoLoginManager()
    
    var titleLabel: UILabel!
    var loginButton: UIButton!
    var descLabel: UILabel!
    
    override func loadView() {
        view = UIView()
        view.backgroundColor = .white
        
        titleLabel = UILabel()
        titleLabel.text = "Timemachine\nLetter"
        titleLabel.textColor = .black
        titleLabel.font = UIFont.systemFont(ofSize: 40)
        titleLabel.textAlignment = .center
        titleLabel.numberOfLines = 2
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(titleLabel)
        
        loginButton = UIButton()
        loginButton.setImage(UIImage(named: "kakaoLogin"), for: .normal)
        loginButton.translatesAutoresizingMaskIntoConstraints = false
        loginButton.addTarget(self, action: #selector(buttonAction), for: .touchUpInside)
        view.addSubview(loginButton)
        
        descLabel = UILabel()
        descLabel.text = "서비스를 시작하는것으로 서비스 약관과 개인정보 제공을 동의합니다"
        descLabel.font = UIFont.systemFont(ofSize: 11)
        descLabel.textColor = .darkGray
        descLabel.textAlignment = .center
        descLabel.numberOfLines = 1
        descLabel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(descLabel)
        
        NSLayoutConstraint.activate([
            titleLabel.widthAnchor.constraint(equalTo: view.layoutMarginsGuide.widthAnchor, multiplier: 0.7),
            titleLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            titleLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor, constant: -100),
            
            loginButton.widthAnchor.constraint(equalToConstant: 300),
            loginButton.heightAnchor.constraint(equalToConstant: 45),
            loginButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            loginButton.bottomAnchor.constraint(equalTo: view.layoutMarginsGuide.bottomAnchor, constant: -100),
            
            descLabel.widthAnchor.constraint(equalTo: view.layoutMarginsGuide.widthAnchor, multiplier: 0.9),
            descLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            descLabel.bottomAnchor.constraint(equalTo: view.layoutMarginsGuide.bottomAnchor, constant: -20),
        ])
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        
        kakaoLoginManager.delegate = self
    }
    
    @objc func buttonAction(sender: UIButton!) {
       
        if UserApi.isKakaoTalkLoginAvailable() {
            UserApi.shared.loginWithKakaoTalk {(oauthToken, error) in
                self.kakaoLoginManager.loginWithToken(oauthToken: oauthToken, error: error)
            }
        } else {
            UserApi.shared.loginWithKakaoAccount {(oauthToken, error) in
                self.kakaoLoginManager.loginWithToken(oauthToken: oauthToken, error: error)
            }
        }
    }
}

// MARK: - KaKaoLoginManagerDelegate

extension LoginViewController: KaKaoLoginManagerDelegate {
    
    func didLoginSuccess() {
        let mainVC = MainViewController()
        mainVC.modalPresentationStyle = .fullScreen
        self.present(mainVC, animated: true)
    }
    
    func didFailWithError(error: Error) {
        let alert = UIAlertController(title: "로그인 실패", message: "\(error.localizedDescription)", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "확인", style: .cancel))
        self.present(alert, animated: true)
    }
}
