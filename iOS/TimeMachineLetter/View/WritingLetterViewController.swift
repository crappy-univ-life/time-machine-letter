//
//  WritingLetterViewController.swift
//  TimeMachineLetter
//
//  Created by TOAD on 2022/05/24.
//

import UIKit
import SwiftUI
import Alamofire

//MARK: - SwiftUI Preview

struct ViewControllerRepresentable: UIViewControllerRepresentable {
    typealias UIViewControllerType = WritingLetterViewController
    
    func makeUIViewController(context: Context) -> WritingLetterViewController {
            return WritingLetterViewController()
        }

        func updateUIViewController(_ uiViewController: WritingLetterViewController, context: Context) {
        }
}

@available(iOS 13.0.0, *)

struct ViewPreview: PreviewProvider {
    static var previews: some View {
        ViewControllerRepresentable()
    }
}

//MARK: - WritingLetterViewController

class WritingLetterViewController: UIViewController {
    
    //MARK: - Objects
    
    private let mainScroll: UIScrollView = {
        var scroll = UIScrollView()
        scroll.backgroundColor = .white
        scroll.translatesAutoresizingMaskIntoConstraints = false
        
        return scroll
    }()
    
    private let backButton: UIButton = {
        var button = UIButton()
        button.setTitle("취소", for: .normal)
        button.setTitleColor(UIColor.black, for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        button.addTarget(self, action: #selector(backAction), for: .touchUpInside)
        
        return button
    }()
    
    private let newLetterLabel: UILabel = {
        var label = UILabel()
        label.text = "새로운 편지"
        label.textColor = UIColor.black
        label.font = UIFont.systemFont(ofSize: 30.0, weight: .bold)
        label.translatesAutoresizingMaskIntoConstraints = false

        return label
    }()
    
    private let previewButton: UIButton = {
        var button = UIButton()
        button.setTitle("미리보기버튼", for: .normal)
        button.setTitleColor(UIColor.black, for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        
        return button
    }()
    
    private let sendButton: UIButton = {
        var button = UIButton()
        button.setTitle("보내기버튼", for: .normal)
        button.setTitleColor(UIColor.black, for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        button.addTarget(self, action: #selector(submitAction), for: .touchUpInside)
        return button
    }()
    
    //MARK: - title object
    
    private let titleLabel: UILabel = {
        var label = UILabel()
        label.text = "제목: "
        label.textColor = .gray
        label.font = UIFont.systemFont(ofSize: 15.0)
        label.translatesAutoresizingMaskIntoConstraints = false
        
        return label
    }()
    
    private let titleTextField: UITextField = {
        var textField = UITextField()
        textField.text = "여기는 제목 입력하는 곳"
        textField.textColor = .gray
        textField.font = UIFont.systemFont(ofSize: 15)
        textField.translatesAutoresizingMaskIntoConstraints = false
        
        return textField
    }()
    
    //MARK: - sender object
    
    private let senderLabel: UILabel = {
        var label = UILabel()
        label.text = "발신자: "
        label.textColor = .gray
        label.font = UIFont.systemFont(ofSize: 15.0)
        label.translatesAutoresizingMaskIntoConstraints = false
        
        return label
    }()
    
    private let senderTextField: UITextField = {
        var textField = UITextField()
        textField.text = "여기는 보내는 사람"
        textField.textColor = .gray
        textField.font = UIFont.systemFont(ofSize: 15)
        textField.translatesAutoresizingMaskIntoConstraints = false

        return textField
    }()
    
    //MARK: - receiver object
    
    private let receiverLabel: UILabel = {
        var label = UILabel()
        label.text = "수신자: "
        label.textColor = .gray
        label.font = UIFont.systemFont(ofSize: 15.0)
        label.translatesAutoresizingMaskIntoConstraints = false
        
        return label
    }()
    
    private let receiverTextField: UITextField = {
        var textField = UITextField()
        textField.text = "여기는 받는 사람"
        textField.textColor = .gray
        textField.font = UIFont.systemFont(ofSize: 15)
        textField.translatesAutoresizingMaskIntoConstraints = false
        
        return textField
    }()
    
    //MARK: - password object
    
    private let passwordLabel: UILabel = {
        var label = UILabel()
        label.text = "비밀번호: "
        label.textColor = .gray
        label.font = UIFont.systemFont(ofSize: 15.0)
        label.translatesAutoresizingMaskIntoConstraints = false
        
        return label
    }()
    
    private let passwordTextField: UITextField = {
        var textField = UITextField()
        textField.text = "여기는 비밀번호"
        textField.textColor = .gray
        textField.font = UIFont.systemFont(ofSize: 15)
        textField.translatesAutoresizingMaskIntoConstraints = false
        
        return textField
    }()
    
    //MARK: - Division Line
    private let divisionLine1: UIView = {
        var view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.widthAnchor.constraint(equalToConstant: 350).isActive = true
        view.heightAnchor.constraint(equalToConstant: 1).isActive = true
        view.backgroundColor = .gray
        
        return view
    }()
    
    private let divisionLine2: UIView = {
        var view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.widthAnchor.constraint(equalToConstant: 350).isActive = true
        view.heightAnchor.constraint(equalToConstant: 1).isActive = true
        view.backgroundColor = .gray
        
        return view
    }()
    
    private let divisionLine3: UIView = {
        var view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.widthAnchor.constraint(equalToConstant: 350).isActive = true
        view.heightAnchor.constraint(equalToConstant: 1).isActive = true
        view.backgroundColor = .gray
        
        return view
    }()
    
    private let divisionLine4: UIView = {
        var view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.widthAnchor.constraint(equalToConstant: 350).isActive = true
        view.heightAnchor.constraint(equalToConstant: 1).isActive = true
        view.backgroundColor = .gray
        
        return view
    }()
    
    private let divisionLineUnderDate: UIView = {
        var view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.widthAnchor.constraint(equalToConstant: 350).isActive = true
        view.heightAnchor.constraint(equalToConstant: 1).isActive = true
        view.backgroundColor = .gray
        
        return view
    }()
    
    //MARK: - date and time object
    
    private let dateAndTimeLabel: UILabel = {
        var label = UILabel()
        label.text = "날짜 및 시간:"
        label.textColor = .gray
        label.font = UIFont.systemFont(ofSize: 15.0)
        label.translatesAutoresizingMaskIntoConstraints = false
        
        return label
    }()
    
    private let dateAndTimePicker: UIDatePicker = {
        var picker = UIDatePicker()
        if #available(iOS 13.4, *) {
            picker.preferredDatePickerStyle = .compact
        }
        picker.datePickerMode = .dateAndTime
        picker.minuteInterval = 5
        picker.timeZone = .autoupdatingCurrent
        picker.translatesAutoresizingMaskIntoConstraints = false
        
        
        
        return picker
    }()
    
    //MARK: - mainTextView
    
    private let mainTextView: UITextView = {
        var textView = UITextView()
        textView.text = "편지를 작성하세요."
        textView.textColor = .gray
        textView.font = UIFont.systemFont(ofSize: 15.0)
        textView.translatesAutoresizingMaskIntoConstraints = false
        
        return textView
    }()
    
    //MARK: - viewDidLoad
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        addingView()
        settingLayout()
        delegating()
        
        
    }
    
    //MARK: - addingView
    
    private func addingView() {
        view.addSubview(mainScroll)
        
        mainScroll.addSubview(backButton)
        mainScroll.addSubview(newLetterLabel)
        
        mainScroll.addSubview(previewButton)
        mainScroll.addSubview(sendButton)
        
        mainScroll.addSubview(titleLabel)
        mainScroll.addSubview(titleTextField)
        mainScroll.addSubview(divisionLine1)
        
        mainScroll.addSubview(senderLabel)
        mainScroll.addSubview(senderTextField)
        mainScroll.addSubview(divisionLine2)

        mainScroll.addSubview(receiverLabel)
        mainScroll.addSubview(receiverTextField)
        mainScroll.addSubview(divisionLine3)

        mainScroll.addSubview(passwordLabel)
        mainScroll.addSubview(passwordTextField)
        mainScroll.addSubview(divisionLine4)

        mainScroll.addSubview(dateAndTimeLabel)
        mainScroll.addSubview(dateAndTimePicker)
        mainScroll.addSubview(divisionLineUnderDate)

        mainScroll.addSubview(mainTextView)
        
        }
    
    //MARK: - delegating
    
    private func delegating() {
        titleTextField.delegate = self
        senderTextField.delegate = self
        receiverTextField.delegate = self
        passwordTextField.delegate = self
        mainTextView.delegate = self
    }
    
    //MARK: - settingLayout
    
    private func settingLayout() {
        NSLayoutConstraint.activate([
            mainScroll.topAnchor.constraint(equalTo: view.topAnchor),
            mainScroll.leftAnchor.constraint(equalTo: view.leftAnchor),
            mainScroll.rightAnchor.constraint(equalTo: view.rightAnchor),
            mainScroll.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            
            backButton.topAnchor.constraint(equalTo: mainScroll.topAnchor, constant: 35),
            backButton.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),
            
            newLetterLabel.topAnchor.constraint(equalTo: backButton.bottomAnchor, constant: 20),
            newLetterLabel.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),
            
            sendButton.centerYAnchor.constraint(equalTo: newLetterLabel.centerYAnchor),
            sendButton.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -20),
            // mainScroll의 rightAnchor에 적용했을 때는 실패, view의 rightAnchor에 적용하니 정상 작동하는 현상
            
            previewButton.centerYAnchor.constraint(equalTo: newLetterLabel.centerYAnchor),
            previewButton.rightAnchor.constraint(equalTo: sendButton.leftAnchor, constant: -10),
            
            titleLabel.topAnchor.constraint(equalTo: newLetterLabel.bottomAnchor, constant: 25),
            titleLabel.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),
            titleLabel.widthAnchor.constraint(equalToConstant: 35),
            titleTextField.centerYAnchor.constraint(equalTo: titleLabel.centerYAnchor),
            titleTextField.leftAnchor.constraint(equalTo: titleLabel.rightAnchor, constant: 10),
            titleTextField.widthAnchor.constraint(equalToConstant: 300),
            divisionLine1.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 10),
            divisionLine1.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),
            
            senderLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 25),
            senderLabel.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),
            senderLabel.widthAnchor.constraint(equalToConstant: 45),
            senderTextField.centerYAnchor.constraint(equalTo: senderLabel.centerYAnchor),
            senderTextField.leftAnchor.constraint(equalTo: senderLabel.rightAnchor, constant: 10),
            senderTextField.widthAnchor.constraint(equalToConstant: 300),
            divisionLine2.topAnchor.constraint(equalTo: senderLabel.bottomAnchor, constant: 10),
            divisionLine2.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),
            
            receiverLabel.topAnchor.constraint(equalTo: senderLabel.bottomAnchor, constant: 25),
            receiverLabel.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),
            receiverLabel.widthAnchor.constraint(equalToConstant: 45),
            receiverTextField.centerYAnchor.constraint(equalTo: receiverLabel.centerYAnchor),
            receiverTextField.leftAnchor.constraint(equalTo: receiverLabel.rightAnchor, constant: 10),
            receiverTextField.widthAnchor.constraint(equalToConstant: 250),
            divisionLine3.topAnchor.constraint(equalTo: receiverLabel.bottomAnchor, constant: 10),
            divisionLine3.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),
            
            passwordLabel.topAnchor.constraint(equalTo: receiverLabel.bottomAnchor, constant: 25),
            passwordLabel.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),
            passwordLabel.widthAnchor.constraint(equalToConstant: 60),
            passwordTextField.centerYAnchor.constraint(equalTo: passwordLabel.centerYAnchor),
            passwordTextField.leftAnchor.constraint(equalTo: passwordLabel.rightAnchor, constant: 10),
            passwordTextField.widthAnchor.constraint(equalToConstant: 250),
            divisionLine4.topAnchor.constraint(equalTo: passwordLabel.bottomAnchor, constant: 10),
            divisionLine4.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),

            dateAndTimeLabel.topAnchor.constraint(equalTo: divisionLine4.bottomAnchor, constant: 15),
            dateAndTimeLabel.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),
            dateAndTimePicker.centerYAnchor.constraint(equalTo: dateAndTimeLabel.centerYAnchor),
            dateAndTimePicker.leftAnchor.constraint(equalTo: dateAndTimeLabel.rightAnchor, constant: 10),
            divisionLineUnderDate.topAnchor.constraint(equalTo: dateAndTimeLabel.bottomAnchor, constant: 15),
            divisionLineUnderDate.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),

            mainTextView.topAnchor.constraint(equalTo: dateAndTimeLabel.bottomAnchor, constant: 20),
            mainTextView.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),
            mainTextView.widthAnchor.constraint(equalToConstant: 350),
            mainTextView.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -10),
        ])
    }
    
    @objc func backAction(sender: UIButton!) {
        dismiss(animated: true)
    }
    
    @objc func submitAction(sender: UIButton!) {
        let letterModel = LetterModel(
            openAt: getTime(dateAndTimePicker.date),
            title: titleTextField.text ?? "none",
            content: mainTextView.text ?? "none",
            letterTo: receiverTextField.text ?? "none",
            letterFrom: senderTextField.text ?? "none",
            password: passwordTextField.text ?? "none"
        )

        AF.request("http://timemachineletter.tk:8080/letter", method: .post, parameters: letterModel, encoder: JSONParameterEncoder.default).validate().responseData { response in
            debugPrint(response)
            switch response.result {
            case .success, .failure(Alamofire.AFError.responseSerializationFailed(reason: Alamofire.AFError.ResponseSerializationFailureReason.inputDataNilOrZeroLength)):
                print("Validation Successful")
                self.dismiss(animated: true)
            case let .failure(error):
                print(error)
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

//MARK: - UITextFieldDelegate

extension WritingLetterViewController: UITextFieldDelegate {
    
    func textFieldDidChangeSelection(_ textField: UITextField) {  // 정확하게 이게 뭔가?
        
    }
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        
        if titleTextField.textColor == .gray || senderTextField.textColor == .gray
            || receiverTextField.textColor == .gray || passwordTextField.textColor == .gray{
            textField.text = nil
            textField.textColor = .black
        }
        
    }
    
    func textFieldDidEndEditing(_ textField: UITextField) {
        
        if titleTextField.text == nil {
            
        }
    }
    
}

//MARK: - UITextAreaDelegate

extension WritingLetterViewController: UITextViewDelegate {
    
//    func textViewDidChangeSelection(_ textView: UITextView) {
//        <#code#>
//    }
    
    func textViewDidBeginEditing(_ textView: UITextView) {
        
        if mainTextView.textColor == .gray {
            textView.text = nil
            textView.textColor = .black
        }
 
    }
    
    func textViewDidEndEditing(_ textView: UITextView) {
        
        if textView.text.isEmpty {
            textView.text = "편지를 작성하세요."
            textView.textColor = .gray
        }
        
    }
    
}
