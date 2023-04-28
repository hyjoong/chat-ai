# AI Chat Bot

## 배포

### [스토리북](https://644b770d6f31c5b4ea387fb7-oqpfbaobgl.chromatic.com)

### [서비스 URL](https://chatting-gpt.vercel.app)

## 사용 방법

#### 1. OpenAI API KEY 발급받기

- [OpenAI API KEY 발급](https://platform.openai.com/account/api-keys) 페이지에서 API KEY를 발급 받는다.
  - 발급된 API KEY는 로그인 페이지에서 입력한다.

#### 2. 로그인

- API KEY를 발급 받은 후, 로그인 페이지에서 API KEY를 입력하고 로그인한다.

#### 3. 채팅방 생성

- 채팅리스트 페이지에서 우측 상단에 있는 + 버튼을 클릭해서 채팅방을 생성한다.
  - 인원 수는 2~5명으로 설정이 가능하다.

#### 4. 채팅방 입장

- 생성된 채팅방을 클릭해서 채팅방으로 들어간다.

#### 5. 채팅

- 채팅방에 들어간 후, AI와 채팅을 나눈다.
- 첫 대화는 사용자가 보내고, 이후에 AI가 답장을 한다.
- 사용자가 15초 동안 답장하지 않으면 하단에 '상대방이 메세지를 입력 중입니다...' 메세지가 뜨며, 이 때는 다른 AI가 답장한다.
- 채팅을 보낼 때 최근 5개의 대화 메시지도 함께 전송되어, 이전 대화를 이어나갈 수 있다.
- 우측 상단에 있는 3dot 아이콘을 클릭해서 방 정보를 수정하거나 채팅방을 나갈 수 있다.

## 로그인 페이지

<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/70426440/235067458-dcf81883-50c3-4bd7-9282-8b8b94f356dd.png">
    </td>
    <td>
     <img src="https://user-images.githubusercontent.com/70426440/235068337-d38a7066-c144-4817-bccb-16c42da2f14d.png">
    </td>
     <td>
     <img src="https://user-images.githubusercontent.com/70426440/235068483-8836987a-32e0-4cc7-8d0d-06eda6330ee2.png">
    </td>
    <td>
     <img src="https://user-images.githubusercontent.com/70426440/235069679-8cdebe69-2c06-43fd-893b-d81f91bcb31d.png">
    </td>
  </tr>
    <tr>
    <td>로그인 버튼이 비활성화 상태인 조건은 Input에 아무것도 입력하지 않은 경우이다.</td>
    <td>Input에 KEY값을 입력하면 로그인 버튼이 활성화 된다.</td>
    <td>입력한 KEY값이 올바르지 않은 경우, 에러 메세지가 표시된다.</td>
    <td>유효한 KEY값을 입력하고 로그인 버튼을 클릭하면 채팅리스트 페이지로 이동한다.</td>
  </tr>
</table>

## 채팅 리스트 페이지

<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/70426440/235071641-3e661abc-5c2b-4948-b3ae-30f103e76a92.png">
    </td>
    <td>
     <img src="https://user-images.githubusercontent.com/70426440/235071772-7ab469ea-fbd1-4c47-9304-aded310458dc.png">
    </td>
     <td>
     <img src="https://user-images.githubusercontent.com/70426440/235071903-5c052739-ff8e-49dc-9d05-7b6533ec29d6.png">
    </td>
    <td>
     <img src="https://user-images.githubusercontent.com/70426440/235072089-c6634f63-ecd8-4d7f-b8b5-8f977cc5ba68.png">
    </td>
  </tr>
    <tr>
    <td>채팅방 목록 페이지에서는 현재 존재하는 채팅방의 목록을 확인할 수 있다. 또한 상단에 위치한 + 버튼을 클릭하여 새로운 채팅방을 생성할 수 있다.</td>
    <td>채팅방을 생성하기 위해서는 방 이름과 방 인원 정보를 입력해야 한다.</td>
    <td>채팅방을 생성한 후에는 수정 버튼을 클릭하여 채팅방 정보를 수정하거나 삭제 버튼을 클릭하여 채팅방을 삭제할 수 있다.</td>
    <td>채팅방 목록에서 원하는 채팅방을 클릭하면 해당 채팅방으로 이동하여 채팅을 진행할 수 있다.</td>
  </tr>
</table>

## 채팅 페이지

<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/70426440/235074475-643a6429-9f92-4343-a415-2faca21b16ab.png">
    </td>
    <td>
     <img src="https://user-images.githubusercontent.com/70426440/235078626-2074d737-6c20-441d-a8c6-3124d18958c8.png">
    </td>
     <td>
     <img src="https://user-images.githubusercontent.com/70426440/235077644-fde122c7-1ea0-4e14-a95f-9e5525df5449.png">
    </td>
    <td>
     <img src="https://user-images.githubusercontent.com/70426440/235077337-08840867-f436-47a7-a5d0-f565ff2478a6.png">
    </td>
  </tr>
    <tr>
    <td>'3dot' 아이콘을 클릭하여 방 정보 수정 또는 채팅방을 나갈 수 있다.</td>
    <td>AI와의 첫 대화는 사용자가 보내고, 이후에는 AI가 답장을 한다.</td>
    <td>사용자가 15초 동안 답장을 하지 않으면 '상대방이 메세지를 입력 중입니다...' 메시지가 뜬다. 이때 AI가 다시 답장을 하며, 사용자는 메세지를 보낼 수 없다.</td>
    <td>채팅을 보낼 때 최근 5개의 대화 메시지도 함께 전송되어, 이전 대화를 이어나갈 수 있다.</td>
  </tr>
</table>
