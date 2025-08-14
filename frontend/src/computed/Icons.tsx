function WeChatIcon(): React.ReactElement {
            return (
                <img src="https://wx.qlogo.cn/mmhead/HmVQlX9WkBsob0GPr1onPAQsqE0FwlEsVhFic80ABEqVPiaHlxDJWib5Rx2t0XqVK5bMQAfgRicuETc/0" alt="Wechat" className="rounded-full" />
            );
          }

  function QQIcon(): React.ReactElement {
    return (
        <img src="https://q.qlogo.cn/g?b=qq&nk=1537871968&s=100" alt="QQ" className="rounded-full" />
    );
  }
  
  function GiteeIcon(): React.ReactElement {
    return (
        <img src="https://foruda.gitee.com/avatar/1735578534702305405/15325054_rustlove_1735578534.png!avatar30" alt="Gitee" className="rounded-full" />
    )
  }

  // 图标组件 避免过度解耦所以不抽离
function GithubIcon(): React.ReactElement {
    return (
      <img src="https://avatars.githubusercontent.com/u/176131572?s=400&u=244bd1c0f3a0ae230c596ba4289015f5a5cc187a&v=4" alt="Gitee" className="rounded-full" />
    )
  }
  
  function GmailIcon(): React.ReactElement {
    return (
      <img src="https://lh3.googleusercontent.com/a/ACg8ocLB9NVwNOXxBbuASRiafGZKBb8ylyQDLs33pw6vvOfWwKsqfak=s192-c-rg-br100" alt="Gmail" className="rounded-full" />
    )
  }

export { WeChatIcon, QQIcon, GiteeIcon, GithubIcon, GmailIcon }; 