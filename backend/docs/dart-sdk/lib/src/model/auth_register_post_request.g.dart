// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_register_post_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const AuthRegisterPostRequestRoleEnum _$authRegisterPostRequestRoleEnum_ADMIN =
    const AuthRegisterPostRequestRoleEnum._('ADMIN');
const AuthRegisterPostRequestRoleEnum _$authRegisterPostRequestRoleEnum_DRIVER =
    const AuthRegisterPostRequestRoleEnum._('DRIVER');
const AuthRegisterPostRequestRoleEnum _$authRegisterPostRequestRoleEnum_RIDER =
    const AuthRegisterPostRequestRoleEnum._('RIDER');

AuthRegisterPostRequestRoleEnum _$authRegisterPostRequestRoleEnumValueOf(
    String name) {
  switch (name) {
    case 'ADMIN':
      return _$authRegisterPostRequestRoleEnum_ADMIN;
    case 'DRIVER':
      return _$authRegisterPostRequestRoleEnum_DRIVER;
    case 'RIDER':
      return _$authRegisterPostRequestRoleEnum_RIDER;
    default:
      throw ArgumentError(name);
  }
}

final BuiltSet<AuthRegisterPostRequestRoleEnum>
    _$authRegisterPostRequestRoleEnumValues = BuiltSet<
        AuthRegisterPostRequestRoleEnum>(const <AuthRegisterPostRequestRoleEnum>[
  _$authRegisterPostRequestRoleEnum_ADMIN,
  _$authRegisterPostRequestRoleEnum_DRIVER,
  _$authRegisterPostRequestRoleEnum_RIDER,
]);

Serializer<AuthRegisterPostRequestRoleEnum>
    _$authRegisterPostRequestRoleEnumSerializer =
    _$AuthRegisterPostRequestRoleEnumSerializer();

class _$AuthRegisterPostRequestRoleEnumSerializer
    implements PrimitiveSerializer<AuthRegisterPostRequestRoleEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'ADMIN': 'ADMIN',
    'DRIVER': 'DRIVER',
    'RIDER': 'RIDER',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'ADMIN': 'ADMIN',
    'DRIVER': 'DRIVER',
    'RIDER': 'RIDER',
  };

  @override
  final Iterable<Type> types = const <Type>[AuthRegisterPostRequestRoleEnum];
  @override
  final String wireName = 'AuthRegisterPostRequestRoleEnum';

  @override
  Object serialize(
          Serializers serializers, AuthRegisterPostRequestRoleEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  AuthRegisterPostRequestRoleEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      AuthRegisterPostRequestRoleEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$AuthRegisterPostRequest extends AuthRegisterPostRequest {
  @override
  final String email;
  @override
  final String password;
  @override
  final String firstName;
  @override
  final String lastName;
  @override
  final AuthRegisterPostRequestRoleEnum role;

  factory _$AuthRegisterPostRequest(
          [void Function(AuthRegisterPostRequestBuilder)? updates]) =>
      (AuthRegisterPostRequestBuilder()..update(updates))._build();

  _$AuthRegisterPostRequest._(
      {required this.email,
      required this.password,
      required this.firstName,
      required this.lastName,
      required this.role})
      : super._();
  @override
  AuthRegisterPostRequest rebuild(
          void Function(AuthRegisterPostRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AuthRegisterPostRequestBuilder toBuilder() =>
      AuthRegisterPostRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AuthRegisterPostRequest &&
        email == other.email &&
        password == other.password &&
        firstName == other.firstName &&
        lastName == other.lastName &&
        role == other.role;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, email.hashCode);
    _$hash = $jc(_$hash, password.hashCode);
    _$hash = $jc(_$hash, firstName.hashCode);
    _$hash = $jc(_$hash, lastName.hashCode);
    _$hash = $jc(_$hash, role.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AuthRegisterPostRequest')
          ..add('email', email)
          ..add('password', password)
          ..add('firstName', firstName)
          ..add('lastName', lastName)
          ..add('role', role))
        .toString();
  }
}

class AuthRegisterPostRequestBuilder
    implements
        Builder<AuthRegisterPostRequest, AuthRegisterPostRequestBuilder> {
  _$AuthRegisterPostRequest? _$v;

  String? _email;
  String? get email => _$this._email;
  set email(String? email) => _$this._email = email;

  String? _password;
  String? get password => _$this._password;
  set password(String? password) => _$this._password = password;

  String? _firstName;
  String? get firstName => _$this._firstName;
  set firstName(String? firstName) => _$this._firstName = firstName;

  String? _lastName;
  String? get lastName => _$this._lastName;
  set lastName(String? lastName) => _$this._lastName = lastName;

  AuthRegisterPostRequestRoleEnum? _role;
  AuthRegisterPostRequestRoleEnum? get role => _$this._role;
  set role(AuthRegisterPostRequestRoleEnum? role) => _$this._role = role;

  AuthRegisterPostRequestBuilder() {
    AuthRegisterPostRequest._defaults(this);
  }

  AuthRegisterPostRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _email = $v.email;
      _password = $v.password;
      _firstName = $v.firstName;
      _lastName = $v.lastName;
      _role = $v.role;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AuthRegisterPostRequest other) {
    _$v = other as _$AuthRegisterPostRequest;
  }

  @override
  void update(void Function(AuthRegisterPostRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AuthRegisterPostRequest build() => _build();

  _$AuthRegisterPostRequest _build() {
    final _$result = _$v ??
        _$AuthRegisterPostRequest._(
          email: BuiltValueNullFieldError.checkNotNull(
              email, r'AuthRegisterPostRequest', 'email'),
          password: BuiltValueNullFieldError.checkNotNull(
              password, r'AuthRegisterPostRequest', 'password'),
          firstName: BuiltValueNullFieldError.checkNotNull(
              firstName, r'AuthRegisterPostRequest', 'firstName'),
          lastName: BuiltValueNullFieldError.checkNotNull(
              lastName, r'AuthRegisterPostRequest', 'lastName'),
          role: BuiltValueNullFieldError.checkNotNull(
              role, r'AuthRegisterPostRequest', 'role'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
