<p>
    Olá {{  $user->nome }},<br>
    Obrigado por criar uma conta conosco. Não esqueça de completar seu cadastro!     <br>
    Por favor, clique no link abaixo ou copie-o para a barra de endereços do seu navegador para confirmar seu endereço de e-mail:
    <a href="http://localhost:4200/#/auth/login?token={{ $user->token }}" target="_blank" data-saferedirecturl="http://127.0.0.1:8000/api/auth/confirmar-email/{{ $user->token }}">Confirme meu endereço de e-mail </a>

</p>
