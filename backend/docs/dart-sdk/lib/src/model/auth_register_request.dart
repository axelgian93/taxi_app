//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_register_request.g.dart';

/// AuthRegisterRequest
///
/// Properties:
/// * [email] 
/// * [password] 
/// * [firstName] 
/// * [lastName] 
/// * [role] 
@BuiltValue()
abstract class AuthRegisterRequest implements Built<AuthRegisterRequest, AuthRegisterRequestBuilder> {
  @BuiltValueField(wireName: r'email')
  String get email;

  @BuiltValueField(wireName: r'password')
  String get password;

  @BuiltValueField(wireName: r'firstName')
  String get firstName;

  @BuiltValueField(wireName: r'lastName')
  String get lastName;

  @BuiltValueField(wireName: r'role')
  AuthRegisterRequestRoleEnum get role;
  // enum roleEnum {  ADMIN,  DRIVER,  RIDER,  };

  AuthRegisterRequest._();

  factory AuthRegisterRequest([void updates(AuthRegisterRequestBuilder b)]) = _$AuthRegisterRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthRegisterRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthRegisterRequest> get serializer => _$AuthRegisterRequestSerializer();
}

class _$AuthRegisterRequestSerializer implements PrimitiveSerializer<AuthRegisterRequest> {
  @override
  final Iterable<Type> types = const [AuthRegisterRequest, _$AuthRegisterRequest];

  @override
  final String wireName = r'AuthRegisterRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthRegisterRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'email';
    yield serializers.serialize(
      object.email,
      specifiedType: const FullType(String),
    );
    yield r'password';
    yield serializers.serialize(
      object.password,
      specifiedType: const FullType(String),
    );
    yield r'firstName';
    yield serializers.serialize(
      object.firstName,
      specifiedType: const FullType(String),
    );
    yield r'lastName';
    yield serializers.serialize(
      object.lastName,
      specifiedType: const FullType(String),
    );
    yield r'role';
    yield serializers.serialize(
      object.role,
      specifiedType: const FullType(AuthRegisterRequestRoleEnum),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    AuthRegisterRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthRegisterRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'email':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.email = valueDes;
          break;
        case r'password':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.password = valueDes;
          break;
        case r'firstName':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.firstName = valueDes;
          break;
        case r'lastName':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.lastName = valueDes;
          break;
        case r'role':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AuthRegisterRequestRoleEnum),
          ) as AuthRegisterRequestRoleEnum;
          result.role = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AuthRegisterRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthRegisterRequestBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

class AuthRegisterRequestRoleEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ADMIN')
  static const AuthRegisterRequestRoleEnum ADMIN = _$authRegisterRequestRoleEnum_ADMIN;
  @BuiltValueEnumConst(wireName: r'DRIVER')
  static const AuthRegisterRequestRoleEnum DRIVER = _$authRegisterRequestRoleEnum_DRIVER;
  @BuiltValueEnumConst(wireName: r'RIDER')
  static const AuthRegisterRequestRoleEnum RIDER = _$authRegisterRequestRoleEnum_RIDER;

  static Serializer<AuthRegisterRequestRoleEnum> get serializer => _$authRegisterRequestRoleEnumSerializer;

  const AuthRegisterRequestRoleEnum._(String name): super(name);

  static BuiltSet<AuthRegisterRequestRoleEnum> get values => _$authRegisterRequestRoleEnumValues;
  static AuthRegisterRequestRoleEnum valueOf(String name) => _$authRegisterRequestRoleEnumValueOf(name);
}

