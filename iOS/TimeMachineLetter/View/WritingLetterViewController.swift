//
//  WritingLetterViewController.swift
//  TimeMachineLetter
//
//  Created by TOAD on 2022/05/24.
//

import UIKit
import SwiftUI

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
        
        return button
    }()
    
    private let newLetterLabel: UILabel = {
        var label = UILabel()
        label.text = "새로운 편지"
        label.textColor = UIColor.black
        label.font = UIFont(name: label.font.fontName, size: 20)
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
        
        return button
    }()
    
    //MARK: - title object
    private lazy var titleStack: UIStackView = {
        var stack = UIStackView(arrangedSubviews: [titleLabel, titleTextField]) // let에서는 등록이 안되는데 lazy var로 객체를 생성하면 가능
        stack.axis = .horizontal
        stack.alignment = .center
        stack.distribution = .fillProportionally
        stack.spacing = 10
        stack.translatesAutoresizingMaskIntoConstraints = false
        
        return stack
    }()
    
    private let titleLabel: UILabel = {
        var label = UILabel()
        label.text = "제목: "
        label.textColor = .gray
        label.font = UIFont(name: label.font.fontName, size: 15)
        label.translatesAutoresizingMaskIntoConstraints = false
        
        return label
    }()
    
    private let titleTextField: UITextField = {
        var textField = UITextField()
        textField.text = "여기는 제목 입력하는 곳"
        textField.textColor = .gray
        textField.font?.withSize(15)
        textField.translatesAutoresizingMaskIntoConstraints = false
        
        return textField
    }()
    
    //MARK: - sender object
    private lazy var senderStack: UIStackView = {
        var stack = UIStackView(arrangedSubviews: [senderLabel, senderTextField]) // let에서는 등록이 안되는데 lazy var로 객체를 생성하면 가능
        stack.axis = .horizontal
        stack.alignment = .center
        stack.distribution = .fillProportionally
        stack.spacing = 10
        stack.translatesAutoresizingMaskIntoConstraints = false
        
        return stack
    }()
    
    private let senderLabel: UILabel = {
        var label = UILabel()
        label.text = "발신자: "
        label.textColor = .gray
        label.font = UIFont(name: label.font.fontName, size: 15)
        label.translatesAutoresizingMaskIntoConstraints = false
        
        return label
    }()
    
    private let senderTextField: UITextField = {
        var textField = UITextField()
        textField.text = "여기는 보내는 사람"
        textField.textColor = .gray
        textField.font?.withSize(15)
        textField.translatesAutoresizingMaskIntoConstraints = false

        return textField
    }()
    
    //MARK: - receiver object
    private lazy var receiverStack: UIStackView = {
        var stack = UIStackView(arrangedSubviews: [receiverLabel, receiverTextField]) // let에서는 등록이 안되는데 lazy var로 객체를 생성하면 가능
        stack.axis = .horizontal
        stack.alignment = .center
        stack.distribution = .fillProportionally
        stack.spacing = 10
        stack.translatesAutoresizingMaskIntoConstraints = false
        
        return stack
    }()
    
    private let receiverLabel: UILabel = {
        var label = UILabel()
        label.text = "수신자: "
        label.textColor = .gray
        label.font = UIFont(name: label.font.fontName, size: 15)
        label.translatesAutoresizingMaskIntoConstraints = false
        
        return label
    }()
    
    private let receiverTextField: UITextField = {
        var textField = UITextField()
        textField.text = "여기는 받는 사람"
        textField.textColor = .gray
        textField.font?.withSize(15)
        textField.translatesAutoresizingMaskIntoConstraints = false
        
        return textField
    }()
    
    //MARK: - password object
    private lazy var passwordStack: UIStackView = {
        var stack = UIStackView(arrangedSubviews: [passwordLabel, passwordTextField]) // let에서는 등록이 안되는데 lazy var로 객체를 생성하면 가능
        stack.axis = .horizontal
        stack.alignment = .center
        stack.distribution = .fillProportionally
        stack.spacing = 10
        stack.translatesAutoresizingMaskIntoConstraints = false
        
        return stack
    }()
    
    private let passwordLabel: UILabel = {
        var label = UILabel()
        label.text = "비밀번호: "
        label.textColor = .gray
        label.font = UIFont(name: label.font.fontName, size: 15)
        label.translatesAutoresizingMaskIntoConstraints = false

        
        return label
    }()
    
    private let passwordTextField: UITextField = {
        var textField = UITextField()
        textField.text = "여기는 비밀번호"
        textField.textColor = .gray
        textField.font?.withSize(15)
        textField.translatesAutoresizingMaskIntoConstraints = false
        
        return textField
    }()
    
    //MARK: - main stack
    private lazy var mainStack: UIStackView = {
        var stack = UIStackView(arrangedSubviews: [titleStack, senderStack, receiverStack, passwordStack])
        stack.axis = .vertical
        stack.alignment = .leading // 왼쪽 끝으로 정렬
        stack.distribution = .fillProportionally
        stack.spacing = 10
    
//        if stack.arrangedSubviews.count > 0 {
//            let separator = UIView()
//            separator.heightAnchor.constraint(equalToConstant: 1).isActive = true
//            separator.backgroundColor = .gray
//            stack.addArrangedSubview(separator)
//            separator.widthAnchor.constraint(equalTo: stack.widthAnchor, multiplier: 1).isActive = true
//        }
        
        stack.translatesAutoresizingMaskIntoConstraints = false
        
        return stack
    }()
    
    //MARK: - date and time object
    private let dateAndTimeLabel: UILabel = {
        var label = UILabel()
        label.text = "날짜 및 시간:"
        label.textColor = .gray
        label.font = UIFont(name: label.font.fontName, size: 15)
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
    
    private let mainTextField: UITextField = {
        var textField = UITextField()
        textField.text = "편지를 작성하세요."
        textField.textColor = .gray
        textField.font?.withSize(15)
        
        textField.layer.borderWidth = 1
        textField.layer.borderColor = UIColor.black.cgColor
        textField.translatesAutoresizingMaskIntoConstraints = false
        
        return textField
    }()
    
    //MARK: - viewDidLoad
    
    override func viewDidLoad() {
        super.viewDidLoad()
        addingView()
        settingLayout()

        // Do any additional setup after loading the view.
    }
    
    //MARK: - addingView
    
    private func addingView() {
        view.addSubview(mainScroll)
        
        mainScroll.addSubview(backButton)
        mainScroll.addSubview(newLetterLabel)
        
        mainScroll.addSubview(previewButton)
        mainScroll.addSubview(sendButton)
        
        mainScroll.addSubview(mainStack)
        
        mainScroll.addSubview(dateAndTimeLabel)
        mainScroll.addSubview(dateAndTimePicker)
        
        mainScroll.addSubview(mainTextField)
        
        }
    
    //MARK: - delegating
    
    private func delegating() {
        
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
            sendButton.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -20), // mainScroll의 rightAnchor에 적용했을 때는 실패, view의 rightAnchor에 적용하니 정상 작동하는 현상

            previewButton.centerYAnchor.constraint(equalTo: newLetterLabel.centerYAnchor),
            previewButton.rightAnchor.constraint(equalTo: sendButton.leftAnchor, constant: -10),
            
            mainStack.topAnchor.constraint(equalTo: newLetterLabel.bottomAnchor, constant: 25),
            mainStack.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),
            mainStack.rightAnchor.constraint(equalTo: mainScroll.rightAnchor, constant: 20),
            mainStack.heightAnchor.constraint(equalToConstant: 130),
            
            dateAndTimeLabel.topAnchor.constraint(equalTo: mainStack.bottomAnchor, constant: 10),
            dateAndTimeLabel.leftAnchor.constraint(equalTo: mainScroll.leftAnchor, constant: 20),
            dateAndTimePicker.centerYAnchor.constraint(equalTo: dateAndTimeLabel.centerYAnchor),
            dateAndTimePicker.leftAnchor.constraint(equalTo: dateAndTimeLabel.rightAnchor, constant: 10),

            mainTextField.topAnchor.constraint(equalTo: dateAndTimeLabel.bottomAnchor, constant: 30),
            mainTextField.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 20),
            mainTextField.widthAnchor.constraint(equalToConstant: 350),
            mainTextField.bottomAnchor.constraint(equalTo: mainScroll.bottomAnchor, constant: -10),
        ])
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
