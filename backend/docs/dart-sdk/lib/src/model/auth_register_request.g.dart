// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_register_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const AuthRegisterRequestRoleEnum _$authRegisterRequestRoleEnum_ADMIN =
    const AuthRegisterRequestRoleEnum._('ADMIN');
const AuthRegisterRequestRoleEnum _$authRegisterRequestRoleEnum_DRIVER =
    const AuthRegisterRequestRoleEnum._('DRIVER');
const AuthRegisterRequestRoleEnum _$authRegisterRequestRoleEnum_RIDER =
    const AuthRegisterRequestRoleEnum._('RIDER');

AuthRegisterRequestRoleEnum _$authRegisterRequestRoleEnumValueOf(String name) {
  switch (name) {
    case 'ADMIN':
      return _$authRegisterRequestRoleEnum_ADMIN;
    case 'DRIVER':
      return _$authRegisterRequestRoleEnum_DRIVER;
    case 'RIDER':
      return _$authRegisterRequestRoleEnum_RIDER;
    default:
      throw ArgumentError(name);
  }
}

final BuiltSet<AuthRegisterRequestRoleEnum>
    _$authRegisterRequestRoleEnumValues =
    BuiltSet<AuthRegisterRequestRoleEnum>(const <AuthRegisterRequestRoleEnum>[
  _$authRegisterRequestRoleEnum_ADMIN,
  _$authRegisterRequestRoleEnum_DRIVER,
  _$authRegisterRequestRoleEnum_RIDER,
]);

Serializer<AuthRegisterRequestRoleEnum>
    _$authRegisterRequestRoleEnumSerializer =
    _$AuthRegisterRequestRoleEnumSerializer();

class _$AuthRegisterRequestRoleEnumSerializer
    implements PrimitiveSerializer<AuthRegisterRequestRoleEnum> {
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
  final Iterable<Type> types = const <Type>[AuthRegisterRequestRoleEnum];
  @override
  final String wireName = 'AuthRegisterRequestRoleEnum';

  @override
  Object serialize(Serializers serializers, AuthRegisterRequestRoleEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  AuthRegisterRequestRoleEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      AuthRegisterRequestRoleEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$AuthRegisterRequest extends AuthRegisterRequest {
  @override
  final String email;
  @override
  final String password;
  @override
  final String firstName;
  @override
  final String lastName;
  @override
  final AuthRegisterRequestRoleEnum role;

  factory _$AuthRegisterRequest(
          [void Function(AuthRegisterRequestBuilder)? updates]) =>
      (AuthRegisterRequestBuilder()..update(updates))._build();

  _$AuthRegisterRequest._(
      {required this.email,
      required this.password,
      required this.firstName,
      required this.lastName,
      required this.role})
      : super._();
  @override
  AuthRegisterRequest rebuild(
          void Function(AuthRegisterRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AuthRegisterRequestBuilder toBuilder() =>
      AuthRegisterRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AuthRegisterRequest &&
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
    return (newBuiltValueToStringHelper(r'AuthRegisterRequest')
          ..add('email', email)
          ..add('password', password)
          ..add('firstName', firstName)
          ..add('lastName', lastName)
          ..add('role', role))
        .toString();
  }
}

class AuthRegisterRequestBuilder
    implements Builder<AuthRegisterRequest, AuthRegisterRequestBuilder> {
  _$AuthRegisterRequest? _$v;

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

  AuthRegisterRequestRoleEnum? _role;
  AuthRegisterRequestRoleEnum? get role => _$this._role;
  set role(AuthRegisterRequestRoleEnum? role) => _$this._role = role;

  AuthRegisterRequestBuilder() {
    AuthRegisterRequest._defaults(this);
  }

  AuthRegisterRequestBuilder get _$this {
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
  void replace(AuthRegisterRequest other) {
    _$v = other as _$AuthRegisterRequest;
  }

  @override
  void update(void Function(AuthRegisterRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AuthRegisterRequest build() => _build();

  _$AuthRegisterRequest _build() {
    final _$result = _$v ??
        _$AuthRegisterRequest._(
          email: BuiltValueNullFieldError.checkNotNull(
              email, r'AuthRegisterRequest', 'email'),
          password: BuiltValueNullFieldError.checkNotNull(
              password, r'AuthRegisterRequest', 'password'),
          firstName: BuiltValueNullFieldError.checkNotNull(
              firstName, r'AuthRegisterRequest', 'firstName'),
          lastName: BuiltValueNullFieldError.checkNotNull(
              lastName, r'AuthRegisterRequest', 'lastName'),
          role: BuiltValueNullFieldError.checkNotNull(
              role, r'AuthRegisterRequest', 'role'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
