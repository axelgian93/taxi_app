// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_me200_response_user.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const AuthMe200ResponseUserRoleEnum _$authMe200ResponseUserRoleEnum_ADMIN =
    const AuthMe200ResponseUserRoleEnum._('ADMIN');
const AuthMe200ResponseUserRoleEnum _$authMe200ResponseUserRoleEnum_DRIVER =
    const AuthMe200ResponseUserRoleEnum._('DRIVER');
const AuthMe200ResponseUserRoleEnum _$authMe200ResponseUserRoleEnum_RIDER =
    const AuthMe200ResponseUserRoleEnum._('RIDER');

AuthMe200ResponseUserRoleEnum _$authMe200ResponseUserRoleEnumValueOf(
    String name) {
  switch (name) {
    case 'ADMIN':
      return _$authMe200ResponseUserRoleEnum_ADMIN;
    case 'DRIVER':
      return _$authMe200ResponseUserRoleEnum_DRIVER;
    case 'RIDER':
      return _$authMe200ResponseUserRoleEnum_RIDER;
    default:
      throw ArgumentError(name);
  }
}

final BuiltSet<AuthMe200ResponseUserRoleEnum>
    _$authMe200ResponseUserRoleEnumValues = BuiltSet<
        AuthMe200ResponseUserRoleEnum>(const <AuthMe200ResponseUserRoleEnum>[
  _$authMe200ResponseUserRoleEnum_ADMIN,
  _$authMe200ResponseUserRoleEnum_DRIVER,
  _$authMe200ResponseUserRoleEnum_RIDER,
]);

Serializer<AuthMe200ResponseUserRoleEnum>
    _$authMe200ResponseUserRoleEnumSerializer =
    _$AuthMe200ResponseUserRoleEnumSerializer();

class _$AuthMe200ResponseUserRoleEnumSerializer
    implements PrimitiveSerializer<AuthMe200ResponseUserRoleEnum> {
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
  final Iterable<Type> types = const <Type>[AuthMe200ResponseUserRoleEnum];
  @override
  final String wireName = 'AuthMe200ResponseUserRoleEnum';

  @override
  Object serialize(
          Serializers serializers, AuthMe200ResponseUserRoleEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  AuthMe200ResponseUserRoleEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      AuthMe200ResponseUserRoleEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$AuthMe200ResponseUser extends AuthMe200ResponseUser {
  @override
  final String? id;
  @override
  final String? email;
  @override
  final AuthMe200ResponseUserRoleEnum? role;
  @override
  final String? firstName;
  @override
  final String? lastName;

  factory _$AuthMe200ResponseUser(
          [void Function(AuthMe200ResponseUserBuilder)? updates]) =>
      (AuthMe200ResponseUserBuilder()..update(updates))._build();

  _$AuthMe200ResponseUser._(
      {this.id, this.email, this.role, this.firstName, this.lastName})
      : super._();
  @override
  AuthMe200ResponseUser rebuild(
          void Function(AuthMe200ResponseUserBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AuthMe200ResponseUserBuilder toBuilder() =>
      AuthMe200ResponseUserBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AuthMe200ResponseUser &&
        id == other.id &&
        email == other.email &&
        role == other.role &&
        firstName == other.firstName &&
        lastName == other.lastName;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, email.hashCode);
    _$hash = $jc(_$hash, role.hashCode);
    _$hash = $jc(_$hash, firstName.hashCode);
    _$hash = $jc(_$hash, lastName.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AuthMe200ResponseUser')
          ..add('id', id)
          ..add('email', email)
          ..add('role', role)
          ..add('firstName', firstName)
          ..add('lastName', lastName))
        .toString();
  }
}

class AuthMe200ResponseUserBuilder
    implements Builder<AuthMe200ResponseUser, AuthMe200ResponseUserBuilder> {
  _$AuthMe200ResponseUser? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  String? _email;
  String? get email => _$this._email;
  set email(String? email) => _$this._email = email;

  AuthMe200ResponseUserRoleEnum? _role;
  AuthMe200ResponseUserRoleEnum? get role => _$this._role;
  set role(AuthMe200ResponseUserRoleEnum? role) => _$this._role = role;

  String? _firstName;
  String? get firstName => _$this._firstName;
  set firstName(String? firstName) => _$this._firstName = firstName;

  String? _lastName;
  String? get lastName => _$this._lastName;
  set lastName(String? lastName) => _$this._lastName = lastName;

  AuthMe200ResponseUserBuilder() {
    AuthMe200ResponseUser._defaults(this);
  }

  AuthMe200ResponseUserBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _email = $v.email;
      _role = $v.role;
      _firstName = $v.firstName;
      _lastName = $v.lastName;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AuthMe200ResponseUser other) {
    _$v = other as _$AuthMe200ResponseUser;
  }

  @override
  void update(void Function(AuthMe200ResponseUserBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AuthMe200ResponseUser build() => _build();

  _$AuthMe200ResponseUser _build() {
    final _$result = _$v ??
        _$AuthMe200ResponseUser._(
          id: id,
          email: email,
          role: role,
          firstName: firstName,
          lastName: lastName,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
