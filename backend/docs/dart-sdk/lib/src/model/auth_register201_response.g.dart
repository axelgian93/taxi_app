// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_register201_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AuthRegister201Response extends AuthRegister201Response {
  @override
  final String? token;
  @override
  final AuthRegister201ResponseUser? user;

  factory _$AuthRegister201Response(
          [void Function(AuthRegister201ResponseBuilder)? updates]) =>
      (AuthRegister201ResponseBuilder()..update(updates))._build();

  _$AuthRegister201Response._({this.token, this.user}) : super._();
  @override
  AuthRegister201Response rebuild(
          void Function(AuthRegister201ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AuthRegister201ResponseBuilder toBuilder() =>
      AuthRegister201ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AuthRegister201Response &&
        token == other.token &&
        user == other.user;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, token.hashCode);
    _$hash = $jc(_$hash, user.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AuthRegister201Response')
          ..add('token', token)
          ..add('user', user))
        .toString();
  }
}

class AuthRegister201ResponseBuilder
    implements
        Builder<AuthRegister201Response, AuthRegister201ResponseBuilder> {
  _$AuthRegister201Response? _$v;

  String? _token;
  String? get token => _$this._token;
  set token(String? token) => _$this._token = token;

  AuthRegister201ResponseUserBuilder? _user;
  AuthRegister201ResponseUserBuilder get user =>
      _$this._user ??= AuthRegister201ResponseUserBuilder();
  set user(AuthRegister201ResponseUserBuilder? user) => _$this._user = user;

  AuthRegister201ResponseBuilder() {
    AuthRegister201Response._defaults(this);
  }

  AuthRegister201ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _token = $v.token;
      _user = $v.user?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AuthRegister201Response other) {
    _$v = other as _$AuthRegister201Response;
  }

  @override
  void update(void Function(AuthRegister201ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AuthRegister201Response build() => _build();

  _$AuthRegister201Response _build() {
    _$AuthRegister201Response _$result;
    try {
      _$result = _$v ??
          _$AuthRegister201Response._(
            token: token,
            user: _user?.build(),
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'user';
        _user?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'AuthRegister201Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
